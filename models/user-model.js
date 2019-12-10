/* External Import Statements */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/* Define Schema */
const userSchema = new Schema({
    username: String,
    googleid: String
});

/* Define Model */
const User = mongoose.model('user', userSchema);

/* Exports */
module.exports = User;