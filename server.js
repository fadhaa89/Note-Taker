const router = require('express').Router();
const helper = require("../db/helper");

// Gets all the notes
router.get("/notes", function (req, res) {
    //1.load db.json
    //2.send db.json
    helper.gatherNotes()
        .then((notes) => {
            return res.json(notes);
        })
        .catch((err) => res.status(500).json(err))

});

// POST `/api/notes` - Should recieve a new note to save on the request body, add it to the `db.json` file, and then return the new note to the client.
router.post("/notes", function (req, res) {
    //1.load db.json    
    //2.add id to the new note
    //3.push new note into the db we got before (object)
    //4.save this array as the db 
    helper.updateNotes(req.body)
        .then((notes) => {
            return res.json(notes);
        })
        .catch((err) => res.status(500).json(err))

});

// Delete a note 
router.delete("/notes/:id", function (req, res) {
    //1.load db
    //2.loop over all entries for the id macting querey
    //3.if we have matched then removed from the array 
    //4.save the db
    let noteId = req.params.id;
    res.json(deleteNote(noteId));
});

module.exports = router;