const fs = require('fs');
const path = require('path');
const { all } = require('../routes/apiRoutes');
let allNotes = [];


class Helper {
    readNotes() {
        return fs.readFileSync('./db.json', "utf-8");
    }

    writeNotes(note){
        return fs.writeFileSync('./db.json', JSON.stringify (note));
      
    }
    // Retrieves all the notes in db.json and store in allNotes array
    gatherNotes() {

        return this.readNotes().then ((notes)=> {
            let allNotes;

            try{
                allNotes= [].concat(JSON.parse(notes))
            }catch(err){
                allNotes =[]
            }
            return allNotes;
        })
    }
    // to do ......//
    // Add a new note to the allNotes array
    //getback in object -Tittle+Text //

    //add an id
    addNote(newNote) {
        allNotes.push(newNote);
        updateNotes(allNotes);
    }

    updateNotes(notes) {
        fs.writeFile(path.join(__dirname, "db", "db.json"), JSON.stringify(notes), err => {
            if (err) throw err;
        });
    }

    deleteNote(id) {
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
}

module.exports = new Helper();
