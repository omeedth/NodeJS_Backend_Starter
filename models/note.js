/* External Import Statements */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/* Define Schema */
const noteSchema = new Schema({
    text: String,
    title: String
});

/* Define Model */
const Note = mongoose.model('note', noteSchema);

/* Exports */
module.exports = Note;