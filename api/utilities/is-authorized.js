import { verify } from "./jwt";
import { User } from '../models';
import { err500S } from "./error-functions";

export default function (req, res, next) {
    var token;
    if (req.headers && req.headers.authorization) 
    {
        var parts = req.headers.authorization.split(" ");
        if (parts.length == 2) 
        {
            var scheme = parts[0];
            var credentials = parts[1];
            if (/^Bearer$/i.test(scheme)) 
            {
                token = credentials;
            }
        } 
        else 
        {
            return res.json(401, { err: "Format is Authorization: Bearer [token]" });
        }
    } 
    else 
    {
        return res.status(401).json({ err: "No Authorization header was found" });
    }

    verify(token, function (err, decoded) 
    {
        if (err) 
        {
            return res.json(401, { err: "Invalid token" });
        }
        if (((req.cookies.token && token == req.cookies.token) || token) &&
            (req.session && req.session.passport &&
            (req.session.passport.user == decoded.data))) 
        {
            req.user = decoded;

            User.findOne({ _id: req.user.data }, function (err, user) {

                if (err) 
                {
                    return err500S(res, err);
                } 
                else 
                {
                    if (user && (user.isActive != 1)) 
                    {
                        req.session.destroy(function (err) {
                            res.clearCookie("user");
                            res.clearCookie("token");
                            req.logout();
                            return res.status(401).json({
                                message: "Your account is deactivated. Please contact admin.",
                                status: false,
                            });
                        });
                    }
                    else 
                    {
                        next();
                    }

                }
            });

        } 
        else 
        {
            return res.json(401, { err: "Invalid token" });
        }
    });
};