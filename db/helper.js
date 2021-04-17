let allNotes = [];

// Gets all the notes
app.get("/api/notes", function(req, res) {
    let notes = allNotes || [];
    res.json(notes);
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


