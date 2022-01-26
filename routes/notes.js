const notes = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const { writeToFile, readAndAppend, readFromFile } = require('../db/fsUtils.js')
const dbNotes = require("../db/db.json")

notes.get('/', (req, res) => {
console.info(`${req.method} request received to get notes inside notes.js`);
    readFromFile('db/db.json', 'utf8').then((data) => res.json(JSON.parse(data)))

});

notes.post('/', (req, res) => {
    console.info(`${req.method} request received to post a note`);
    const { title, text } = req.body;
    //makes sure note only is saved if it has content in title and text
    if (title && text) {

        const newNote = {
            title,
            text,
            id: uuidv4(),
        }

        /** 
        *  Function to read data from a given a file and append some content
        *  @param {object} content The content you want to append to the file.
        *  @param {string} file The path to the file you want to save to.
        *  @returns {void} Nothing
        */
        readAndAppend(newNote, 'db/db.json')

        const response = {
            status: 'success',
            body: newNote,
        }

       return res.json(response);
        console.log(newNote)
    }
    else {
        res.json('There was in error in posting your note');
    }

})

notes.delete('/:id', (req, res) => {
//id is retrieved from the paramater method folling the /notes.
    const requestedID = req.params.id;
    //empty array to store the new notes we want to pass through to db.json after seeing if the requestedID matches a current id in the db.json file
    const updatedNotes = []

//loop through each id in our current db.json file and see if it matches the delete id the user clicked on. If it doesn't match, pass the note through to the db.json file.
    for (let i = 0; i < dbNotes.length; i++) {
        const dbId = dbNotes[i].id
        if (requestedID !== dbId) {
            updatedNotes.push(dbNotes[i]);
        }
    }

    //check to make sure our updated notes array only includes the notes that don't match the deleted id the user clicked on. 
    
   console.log(updatedNotes)//working properly. This should overwrite what is currently in the db.json.
    writeToFile( updatedNotes, 'db/db.json' )
    const response = {
        status: 'success',
        body: updatedNotes,
      };
  
    return  res.json(response);

    })

module.exports = notes


