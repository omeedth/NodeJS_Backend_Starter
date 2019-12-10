/* External Import Statements */
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');

/* Internal Import Statements */
const User = require('../models/user-model'); // If using Mongoose

const keys = require('../config/keys');

/* Passport Serialization and Deserialization - Mongoose */
passport.serializeUser((user, done) => {
    done(null, user.id) // passing in the user's ID from our MongoDB database to save in the browser cookie
});

passport.deserializeUser((id, done) => {
    User.findById(id).then((user) => {
        done(null, user) // from the browser cookie's saved user id info we get the user and tell the client
    }).catch((err) => {
        console.log('Failed to deserialize the user!',err)
    })
});

/* Passport Middleware - Mongoose */
// NOTE: This can be used when using Mongoose
passport.use(
    new GoogleStrategy({
        // Options for the strategy
        callbackURL: '/auth/google/redirect',
        clientID: keys.google.auth.clientID,
        clientSecret: keys.google.auth.clientSecret
    }, (accessToken, refreshToken, profile, done) => {
        // Callback function

        /* Check If User Already In DB */
        User.findOne({googleid: profile.id}).then((currentUser) => {
            if(currentUser) {
                // already have the user
                console.log('User is:',currentUser)
                done(null, currentUser)
            } else {
                // if not create the user in the DB

                /* Saving User In MongoDB */
                new User({
                    username: profile.displayName,
                    googleid: profile.id
                }).save().then((newUser) => {                   // mongoose must be how the database connected for this to work
                    console.log('new user created:',newUser)
                    done(null, newUser)
                }).catch((err) => {
                    console.log('Failed to save the new user!',err)
                })
            }
        });                
    })
);