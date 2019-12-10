/* External Import Statements */
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const ObjectID = require('mongodb').ObjectID; // If I am using Mongodb

/* Internal Import Statements */
// const User = require('../models/user-model'); // If using Mongoose

const keys = require('../config/keys');

/* Constants */
var database; // If using Mongo

/* Passport Serialization and Deserialization - Mongoose */
// passport.serializeUser((user, done) => {
//     done(null, user.id) // passing in the user's ID from our MongoDB database to save in the browser cookie
// });

// passport.deserializeUser((id, done) => {
//     User.findById(id).then((user) => {
//         done(null, user) // from the browser cookie's saved user id info we get the user and tell the client
//     }).catch((err) => {
//         console.log('Failed to deserialize the user!',err)
//     })
// });

/* Passport Serialization and Deserialization - Mongo */
passport.serializeUser((user, done) => {
    // console.log('Serializing User...') // DEBUG LINE
    done(null, user._id) // passing in the user's ID from our MongoDB database to save in the browser cookie
});

passport.deserializeUser((id, done) => {
    // console.log('Deserializing User...') // DEBUG LINE
    database.collection('users').findOne({ '_id': new ObjectID(id) }, (err, user) => {
        if(err) {
            console.log('Failed to deserialize the user!',err)
        } else {
            console.log('Successfully deserialized')
            done(null, user) // from the browser cookie's saved user id info we get the user and tell the client
        }
    });
});

/* Passport Middleware - Mongoose */
// NOTE: This can be used when using Mongoose
// passport.use(
//     new GoogleStrategy({
//         // Options for the strategy
//         callbackURL: '/auth/google/redirect',
//         clientID: keys.google.auth.clientID,
//         clientSecret: keys.google.auth.clientSecret
//     }, (accessToken, refreshToken, profile, done) => {
//         // Callback function

//         /* Check If User Already In DB */
//         User.findOne({googleid: profile.id}).then((currentUser) => {
//             if(currentUser) {
//                 // already have the user
//                 console.log('User is:',currentUser)
//                 done(null, currentUser)
//             } else {
//                 // if not create the user in the DB

//                 /* Saving User In MongoDB */
//                 new User({
//                     username: profile.displayName,
//                     googleid: profile.id
//                 }).save().then((newUser) => {                   // mongoose must be how the database connected for this to work
//                     console.log('new user created:',newUser)
//                     done(null, newUser)
//                 }).catch((err) => {
//                     console.log('Failed to save the new user!',err)
//                 })
//             }
//         });                
//     })
// );

/* Functions - (setup() -> MongoDB) */

function setup(db) { // If using MongoDB

    database = db;
    // console.log('Database:',database) // DEBUG LINE

    passport.use(
        new GoogleStrategy({
            // Options for the strategy
            callbackURL: '/auth/google/redirect',
            clientID: keys.google.auth.clientID,
            clientSecret: keys.google.auth.clientSecret
        }, (accessToken, refreshToken, profile, done) => {
            // Callback function
    
            // console.log(profile); // DEBUG LINE

            /* Check If User Already In DB */            
            db.collection('users').findOne({googleid: profile.id}, (err, currentUser) => {
                
                // console.log(err) // DEBUG LINE
                // console.log(currentUser) // DEBUG LINE

                if(err) {
                    // console.log('Error!') // DEBUG LINE
                    return console.log(err); 
                }                    

                if(currentUser) {
                    // Found the user
                    // console.log('User Found!') // DEBUG LINE
                    done(null, currentUser)                    
                } else {
                    // Did NOT find the user
                    // console.log('Failed to find the user!',err) // DEBUG LINE
                    const newUser = {
                        username: profile.displayName,
                        googleid: profile.id
                    }
                    db.collection('users').insert(newUser, (err, result) => {
                        if(err) {
                            // console.log('Failed to save the new user!',err) // DEBUG LINE
                            done('Failed to save user!', null);
                        } else {
                            // console.log('new user created:\n',result.ops[0]) // DEBUG LINE
                            done(null, result.ops[0])
                        }
                    });
                }                
            });   

        })
    );

    console.log('Passport Setup!');

}

/* Exports */
module.exports = {
    setup: setup
};