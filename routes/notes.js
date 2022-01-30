//file contains our get, post, and delete routes. Imports and requires here make it happen!
const notes = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const { writeToFile, readAndAppend, readFromFile } = require('../db/fsUtils.js')
const dbNotes = require("../db/db.json")
const fs = require('fs')
const path = require('path');
//get request at api/notes. See routes/index.js for original route naming.
notes.get('/', (req, res) => {
    console.info(`${req.method} request received for notes`);
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

//post request so we can write new notes!
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
       //calling in readAndAppend from our fs.utils to keep this file clean.
        readAndAppend(newNote, 'db/db.json')

        const response = {
            status: 'success',
            body: newNote,
        }
        return res.json(response);
    }
    else {
        res.json('There was in error in posting your note');
    }
})
//deleting a note. I could also have used the for-loop in place of the filter array method. Had that originally and went with the cleaner method. 
notes.delete('/:id', (req, res) => {
    //id is retrieved from the parameter method, in the :id above
    let requestedID = req.params.id;
    //here we dynamically grab our existing notes by reading the db.json file. This is better than requiring the existing notes in the beginning, because it's not called on unless the user clicks delete :) 
    let notesJSON = JSON.parse(fs.readFileSync(path.join(__dirname, "../db/db.json")))
    //the magic! Filter function takes the id child in each array object and compares it to the id from my parameter. 
    notesJSON = notesJSON.filter((note) => requestedID !== note.id)
    //Will filter the array so objects only continue on if their id does NOT match the requestedID from params.
    console.log(`${req.method} request received to delete.`)
    //here we write our filtered array back to the db json file. We stringify it back into the proper format
    fs.writeFileSync('db/db.json',
        JSON.stringify(notesJSON, null, 4)
    )
    //standard - ok message
    res.sendStatus(200);
})

//export these beautiful routes to my index.js.
module.exports = notes


