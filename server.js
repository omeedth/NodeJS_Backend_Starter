/* External Import Statements */
const express = require('express');
const mongoose = require('mongoose');               // Used the mLab online MongoDB client (Or this, NOT BOTH)
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieSession = require('cookie-session');
const passport = require('passport');

/* Personal Import Statements */
const Routes = require('./app/routes'); // Defaults to importing the "module.exports" object in the "index.js" file
const AuthRoutes = require('./app/routes/auth_routes'); // Gets the auth routes within
const profileRoutes = require('./app/routes/profile_routes'); // Gets the profile routes within - Only if you render also with the backend

const keys = require('./config/keys');
const db = require('./config/db');
const setup = require('./config/setup');
const passportSetup = require('./config/passport-setup');

/* Proper App.use Setup Order */
// 1. cookieParser
// 2. session
// 3. passport.initialize
// 4. passport.session
// 5. app.router

/* Constant Setup */
const app = express();
const port = process.env.port | 8000;

/* App Middleware */
app.use(bodyParser.json()); // Allows for parsing json objects
// app.use(bodyParser.urlencoded({ extended: true })); // value can be any type when "extended" is set to true (ONLY URL-Encoded Forms)

app.use(cookieSession({
    name: "session",
    maxAge: 24 * 60 * 60 * 1000,
    keys: [keys.session.cookieKey],
    sameSite: 'lax',
    secure: false
}));

// Initializing Passport
app.use(passport.initialize());
app.use(passport.session());

app.use(cors(setup.cors.corsOptions)); // Production
// app.use(cors()); // Development

/* Option 2 -> Mongoose */
// NOTE: mongoose does NOT pass the database as an object to routes, but instead uses predefined schemas made in other files
mongoose.connect(db.mongo.uri, { // Make sure the computers IP address is whitelisted (IP addresses might change)
    useNewUrlParser: true,
    useUnifiedTopology: true 
}, (err) => {
    if(err)
        return console.log(err);

    console.log('Connected to MongoDB!');
})

/* Setup Additional Routes */

app.use('/auth', AuthRoutes); // To access the auth routes you have to go to '/auth' first
app.use('/profile', profileRoutes); // To access the profile routes you have to go to '/profile/ first

Object.keys(Routes).forEach((key, index) => {
    const route = Routes[key];
    route(app); // Works because all routes only take app
});

/* OPTIONAL/DEBUGGING Routes */

// Checks to see if the request object has a signed in user
// If so... continues on to next middleware or request in pipeline
// If not... sends JSON object saying "user has not been authenticated"
const authCheck = (req, res, next) => {
    // console.log('Checking Auth Status...') // DEBUG LINE
    if (!req.user) {
        res.status(401).json({
            authenticated: false,
            message: "user has not been authenticated"
        });
    } else {
        next();
    }
};
  
// if it's already login, send the profile response,
// otherwise, send a 401 response that the user is not authenticated
// authCheck before navigating to home page
app.get("/", authCheck, (req, res) => {
    res.status(200).json({
      authenticated: true,
      message: "user successfully authenticated",
      user: req.user,
      cookies: req.cookies
    });
});

/* Server Listening */
app.listen(port, () => {
    console.log('Backend is running on port:',port)
});