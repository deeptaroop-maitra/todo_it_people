import config from "./config/config";
import express from "express"; // This is to include ExpressJs Library in the nodejs.
import mongoose from "mongoose";
import bluebird from "bluebird";
import bodyParser from "body-parser";
import cors from "cors";
import passport from "passport";
import flash from "express-flash";
import cookieParser from "cookie-parser";
import session from "express-session";
import taskRoutes from './api/routes/tasks.route';
import userRoutes from "./api/routes/user.route";
import intializePassport from "./config/passport-config";

const MongoStore = require('connect-mongo')(session);

import methodOverride from 'method-override'

let app = new express();
app.set('view engine', 'ejs');
app.use(cookieParser('test'));
app.use(bodyParser.json({ limit: '500mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }))
app.use(methodOverride('_method'));

app.use(cors());
app.use(flash())
mongoose.Promise = bluebird;
mongoose.connect(config.dbUrl, { useNewUrlParser: true, useUnifiedTopology: true }, function (err, db) {
    if (err) {
        console.log('Unable to connect to the server. Please start the server. Error:', err);
    } else {
        console.log('Connected to DB successfully!');
    }
});
var db = mongoose.connection;
app.use(session({
    secret: 'test',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1200000,
        httpOnly: true,
        secure: false
    },
    store: new MongoStore({
        ttl: 1200000,
        mongooseConnection: db,
    })
}))
intializePassport(passport);
app.use(passport.initialize())
app.use(passport.session())

mongoose.set('debug', false);

//add routes here
app.use('/user', userRoutes);
app.use('/tasks', taskRoutes)

app.get('/', (req, res) => {
    return res.end('Api workings');
})

app.listen(config.port, function () {
    console.log('Listing port: ' + config.port)
});
