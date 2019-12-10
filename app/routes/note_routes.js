// NOTE: This is a test file and is NOT necessary for actual development

/* External Import Statements */
const ObjectID = require('mongodb').ObjectID;

/* Internal Import Statements */
const Note = require('../../models/note'); // If I am using Mongoose

/* Define Functions - Mongoose */

function test (app) {
    app.post('/test', (req,res) => {
        res.status(200).send('Hello World!')       
    });
}

function createNote (app) {
    app.post('/test/db', (req,res) => {      
        console.log(req.body);
        new Note({
            text: req.body.body,
            title: req.body.title
        }).save().then((newNote) => {
            res.status(200).send(newNote)
        }).catch((err) => {
            res.status(500).send(err)
        });        
    });
}

function readNote (app) {
    app.get('/notes/:id', (req, res) => {    
        const id = req.params.id    
        const details = { '_id': new ObjectID(id) }
        Note.findOne(details).then((note) => {
            res.status(200).send(note)
        }).catch((err) => {
            res.status(500).send(err)
        });        
    });
}

function deleteNote (app) {
    app.delete('/notes/:id', (req, res) => {    
        const id = req.params.id    
        const details = { '_id': new ObjectID(id) }
        Note.deleteOne(details).then((item) => {
            res.status(200).send({ msg: 'Note ' + id + ' deleted!'})
        }).catch((err) => {
            res.status(500).send(err)
        });
    });       
}

function updateNote (app) {    
    app.put('/notes/:id', (req, res) => {    
        const id = req.params.id    
        const details = { '_id': new ObjectID(id) }
        const note = { text: req.body.body, title: req.body.title } 
        Note.updateOne(details, note).then((updatedNote) => {
            res.status(200).send(note)
        }).catch((err) => {
            res.status(500).send(err)
        });
    });
}

/* Export Functions */
module.exports = {
    test: test,
    createNote: createNote,
    readNote: readNote,
    deleteNote: deleteNote,
    updateNote: updateNote,
}