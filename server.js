const express = require('express');
const fs = require('fs');
const path = require('path');
const PORT = process.env.PORT || 3000;
const app = express();
let allNotes = [];

app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/notes", function(req, res) {
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

// Retrieves all the notes in db.json and store in allNotes array
function gatherNotes() {
    var rawNotes = fs.readFileSync(path.join(__dirname, "db", "db.json"))
    return JSON.parse(rawNotes)
}
// Add a new note to the allNotes array
function addNote(newNote) {
    allNotes.push(newNote);
    updateNotes(allNotes);
}
function updateNotes(notes) {
    fs.writeFile(path.join(__dirname, "db", "db.json"), JSON.stringify(notes), err => {
        if (err) throw err;
    });
}
function deleteNote(id) {
    const noteToDelete = allNotes.find(note => note.id === id);
    if (!noteToDelete) {
        return;
    }
    // Remove the note from the notes array
    allNotes.splice(allNotes.indexOf(noteToDelete), 1);
    // Update the db.json file
    updateNotes(allNotes);
    console.log('Note to delete:' + noteToDelete);
    return noteToDelete;
}





app.listen(PORT, () => {
    allNotes = gatherNotes();
    console.log(`API server now on port ${PORT}!`);
});