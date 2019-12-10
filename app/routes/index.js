/* Import Statements */
const noteRoutes = require('./note_routes');

/* Define Functions - MongoDB */
function test(app, db) {
    noteRoutes.test(app, db);
}

function createNote(app, db) {
    noteRoutes.createNote(app, db);
}

function readNote(app, db) {
    noteRoutes.readNote(app, db);
}

function deleteNote(app, db) {
    noteRoutes.deleteNote(app, db);
}

function updateNote(app, db) {
    noteRoutes.updateNote(app, db);
}

/* Define Functions - Mongoose */
// function test(app) {
//     noteRoutes.test(app);
// }

// function createNote(app) {
//     noteRoutes.createNote(app);
// }

// function readNote(app) {
//     noteRoutes.readNote(app);
// }

// function deleteNote(app) {
//     noteRoutes.deleteNote(app);
// }

// function updateNote(app) {
//     noteRoutes.updateNote(app);
// }

module.exports = {
    test: test,
    createNote, createNote,
    readNote: readNote,
    deleteNote: deleteNote,
    updateNote: updateNote,
}
