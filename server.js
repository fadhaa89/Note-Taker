const express = require('express');
const fs = require('fs');
const path = require('path');
const PORT = process.env.PORT || 3001;
const app = express();
const allNotes = [];

app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/notes", function(req, res) {
    debugger;
    res.sendFile(path.join(__dirname, "public", "notes.html"))

});
// Gets all the notes
app.get("/api/notes", function(req, res) {
    let notes = allNotes || [];
    res.json(notes);
});
// POST `/api/notes` - Should recieve a new note to save on the request body, add it to the `db.json` file, and then return the new note to the client.
app.post("/api/notes", function(req, res) {
    var newNote = req.body;
    newNote.id = Date.now();
    addNote(newNote);
    updateNotes(allNotes);
    res.json(newNote);
    console.log('New note appended: ' + JSON.stringify(newNote));
    return newNote;
});
// Delete a note 
app.delete("/api/notes/:id", function(req, res) {
    let noteId = req.params.id;
    res.json(deleteNote(noteId));
});







app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});