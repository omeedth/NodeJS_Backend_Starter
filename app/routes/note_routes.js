// NOTE: This is a test file and is NOT necessary for actual development

/* External Import Statements */
const ObjectID = require('mongodb').ObjectID; // If I am using Mongodb

/* Internal Import Statements */
// const Note = require('../../models/note'); // If I am using Mongoose

/* Define Functions - MongoDB */

function test (app, db) {
    app.post('/test', (req,res) => {
        res.status(200).send('Hello World!')       
    });
}

function createNote (app, db) {
    app.post('/test/db', (req,res) => {      
        console.log(req.body);  
        const note = { text: req.body.body, title: req.body.title}
        db.collection('notes').insert(note, (err, result) => {
            if(err) {
                res.status(500).send(err);
            } else {
                res.status(200).send(result.ops[0])
            }
        });        
    });
}

function readNote (app, db) {
    app.get('/notes/:id', (req, res) => {    
        const id = req.params.id    
        const details = { '_id': new ObjectID(id) }
        db.collection('notes').findOne(details, (err, item) => {
            if(err) {
                res.status(500).send(err)
            } else {
                res.status(200).send(item)
            }
        });
    });
}

function deleteNote (app, db) {
    app.delete('/notes/:id', (req, res) => {    
        const id = req.params.id    
        const details = { '_id': new ObjectID(id) }
        db.collection('notes').remove(details, (err, item) => {
            if(err) {
                res.status(500).send(err)
            } else {
                res.status(200).send('Note ' + id + ' deleted!')
            }
        });
    });
}

function updateNote (app, db) {
    app.put('/notes/:id', (req, res) => {    
        const id = req.params.id    
        const details = { '_id': new ObjectID(id) }
        const note = { text: req.body.body, title: req.body.title } 
        db.collection('notes').update(details, note, (err, item) => {            
            if(err || (note.text == null && note.title == null)) {
                res.status(500).send(err)
            } else {
                res.status(200).send(note)
            }
        });
    });
}

/* Define Functions - Mongoose */

// function test (app) {
//     app.post('/test', (req,res) => {
//         res.status(200).send('Hello World!')       
//     });
// }

// function createNote (app) {
//     app.post('/test/db', (req,res) => {      
//         console.log(req.body);
//         new Note({
//             text: req.body.body,
//             title: req.body.title
//         }).save().then((newNote) => {
//             res.status(200).send(newNote)
//         }).catch((err) => {
//             res.status(500).send(err)
//         });        
//     });
// }

// function readNote (app) {
//     app.get('/notes/:id', (req, res) => {    
//         const id = req.params.id    
//         const details = { '_id': new ObjectID(id) }
//         Note.findOne(details).then((note) => {
//             res.status(200).send(note)
//         }).catch((err) => {
//             res.status(500).send(err)
//         });        
//     });
// }

// function deleteNote (app) {
//     app.delete('/notes/:id', (req, res) => {    
//         const id = req.params.id    
//         const details = { '_id': new ObjectID(id) }
//         Note.deleteOne(details).then((item) => {
//             res.status(200).send('Note ' + id + ' deleted!')
//         }).catch((err) => {
//             res.status(500).send(err)
//         });
//     });       
// }

// function updateNote (app) {    
//     app.put('/notes/:id', (req, res) => {    
//         const id = req.params.id    
//         const details = { '_id': new ObjectID(id) }
//         const note = { text: req.body.body, title: req.body.title } 
//         Note.updateOne(details, note).then((updatedNote) => {
//             res.status(200).send(updateNote)
//         }).catch((err) => {
//             res.status(500).send(err)
//         });
//     });
// }

/* Export Functions */
module.exports = {
    test: test,
    createNote: createNote,
    readNote: readNote,
    deleteNote: deleteNote,
    updateNote: updateNote,
}