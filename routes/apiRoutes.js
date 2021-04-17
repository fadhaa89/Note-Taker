const router = require ('express').Router();
const helper = require ("../db/helper")

// POST `/api/notes` - Should recieve a new note to save on the request body, add it to the `db.json` file, and then return the new note to the client.
router.post("/api/notes", function(req, res) {
    var newNote = req.body;
    newNote.id = Date.now();
    addNote(newNote);
    updateNotes(allNotes);
    res.json(newNote);
    console.log('New note appended: ' + JSON.stringify(newNote));
    return newNote;
});

// Delete a note 
router.delete("/api/notes/:id", function(req, res) {
    let noteId = req.params.id;
    res.json(deleteNote(noteId));
});

module.exports = router;