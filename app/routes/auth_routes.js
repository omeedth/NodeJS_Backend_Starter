/* External Import Statements */
const router = require('express').Router();
const passport = require('passport');

/* Constants */
CLIENT_HOME_PAGE_URL = 'http://localhost:3000'; // This is the url for the frontend side of your app

/* Routes */
router.get('/login', (req, res) => { // Only need this if we render here! Or we can redirect to our client 
    res.send('Need to login!'); 
});

router.get('/logout', (req, res) => {
    // Handle with passport
    req.logout();
    res.redirect(CLIENT_HOME_PAGE_URL); // Front end will load this backend's URL and the backend will do the work and redirect to the front end
});

// when login is successful, retrieve user info
router.get("/login/success", (req, res) => {
    if (req.user) {
      res.json({
        success: true,
        message: "user has successfully authenticated",
        user: req.user,
        cookies: req.cookies
      });
    }
});

// when login failed, send failed msg
router.get("/login/failed", (req, res) => {
    res.status(401).json({
      success: false,
      message: "user failed to authenticate."
    });
});

/* Login Providers */
router.get('/google', passport.authenticate('google',{  // Logs in to google and returns back a code and sends to callback
    scope: ['profile']
}));

/* Redirect Routes */
router.get('/google/redirect', passport.authenticate('google', {
    successRedirect: CLIENT_HOME_PAGE_URL, // Front end will load this backend's URL and the backend will do the work and redirect to the front end
    failureRedirect: "/auth/login/failed"
}), (req, res) => {          // Logs in again except this time it just uses the code and returns information we requested in the 'scope'
    res.send(req.user)
});

/* Exports */
module.exports = router // exporting the router with all of the routes connected