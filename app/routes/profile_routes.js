/* External Import Statements */
const router = require('express').Router();

/* Middleware */
const authCheck = (req, res, next) => {
    if(!req.user) {
        // if user is not logged in
        res.redirect('/auth/login')
    } else {
        // if logged in
        next()
    }
};

/* Routes */
router.get('/', authCheck, (req, res) => {
    res.send('You are logged in, this is your profile - ' + req.user.username) // username is a field we defined for the users
});

/* Exports */
module.exports = router;