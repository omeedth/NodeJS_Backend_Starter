/* Import Statements */
const noteRoutes = require('./note_routes');

/* Define Functions - Mongoose */
function test(app) {
    noteRoutes.test(app);
}

function createNote(app) {
    noteRoutes.createNote(app);
}

function readNote(app) {
    noteRoutes.readNote(app);
}

function deleteNote(app) {
    noteRoutes.deleteNote(app);
}

function updateNote(app) {
    noteRoutes.updateNote(app);
}

/* Exports */
module.exports = {
    test: test,
    createNote, createNote,
    readNote: readNote,
    deleteNote: deleteNote,
    updateNote: updateNote,
}
