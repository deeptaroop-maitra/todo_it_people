import passportLocal from "passport-local";
import bcrypt from "bcryptjs";
import User from "./../api/models/user.model";

const LocalStrategy = passportLocal.Strategy;

export default function initialize(passport) {
    const authenticateUser = async (req, email, password, done) => {

        await User.findOne({ emailId: new RegExp('^'+email.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')+'$', 'i') , isActive: '1' }).populate('userType')
            .then(async function (data) {
                if (data == null) {
                    return done(null, false, { message: 'This email is not associated with an account OR your doctor’s membership has expired. Please contact your doctor’s office for support.', fieldMessage: 'Incorrect email', field: "emailId", status: true })
                }

                try {
                    if (await bcrypt.compare(password, data.password)) {
                        return done(null, data, { message: 'Login Successfully', status: true })
                    } else {
                        return done(null, false, {
                            message: 'Incorrect password',
                            fieldMessage: 'Incorrect password', field: "password", status: true, incorrectPassword: true, userData: data
                        })
                    }
                } catch (e) {
                    return done(e)
                }
            })
            .catch(function (err) {
                return done(null, false, { message: 'Incorrect password', status: false })
            });
    }

    passport.use(new LocalStrategy({ usernameField: 'emailId', passReqToCallback: true }, authenticateUser))
    passport.serializeUser((user, done) => done(null, user._id))

    passport.deserializeUser(async (id, done) => {
        await User.findById(id, function (err, user) { done(err, user); });
    })
}