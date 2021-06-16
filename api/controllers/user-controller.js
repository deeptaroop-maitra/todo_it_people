import { err500S, allFieldsRequiredS } from "../utilities/error-functions";
import { sign } from "../utilities/jwt";
import passport from "passport";
import { User, Tasks } from "../models";


export const login = async function (req, res) 
{
  if (!req.body.emailId || !req.body.password) 
  {
    return allFieldsRequiredS(res);
  }
  await passport.authenticate("local", async function (err, user, info) {
    if (err || !user) {
      return res.send({
        message: info.message,
        status: info.status,
      });
    }
    let maxAge = {
      expires: new Date(Number(new Date()) + 315360000000),
    };
    let token = sign(user._id.toString());
    let userData = Buffer.from(JSON.stringify(user), "ascii").toString(
      "base64"
    );
    await res.cookie("user", userData, maxAge);
    await res.cookie("token", token, maxAge);
    await User.findOne({ emailId: user.emailId.lowerCase() },async function (err, docs) {
      if (err) {
        return err500S(err);
      }
      if (docs) {
        const tasks = await Tasks.find({ userId: user._id });
        return res.status(200).json({
          message: 'Login Successfull',
          userDetails: user,
          todoTasks: tasks,
          status: true,
        });
      }
    });
  })(req, res);
};