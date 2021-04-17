const router = require('express').Router();
const helper = require("../db/helper");

// Gets all the notes
router.get("/notes", function (req, res) {
    helper.gatherNotes()
        .then((notes) => {
            return res.json(notes);
        })
        .catch((err) => res.status(500).json(err))

});

// POST `/api/notes` - Should recieve a new note to save on the request body, add it to the `db.json` file, and then return the new note to the client.
router.post("/notes", function (req, res) {
    helper.updateNotes(req.body)
        .then((notes) => {
            return res.json(notes);
        })
        .catch((err) => res.status(500).json(err))

});

// Delete a note 
router.delete("/notes/:id", function (req, res) {
    let noteId = req.params.id;
    res.json(deleteNote(noteId));
});

module.exports = router;