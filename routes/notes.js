const notes = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const { writeToFile, readAndAppend } = require('../db/fsUtils.js')
const fs = require('fs');
const util = require('util');
const dbNotes = require("../db/db.json")
const { append } = require('express/lib/response');

const readFromFile = util.promisify(fs.readFile);

notes.get('/', (req, res) =>

    readFromFile('db/db.json', 'utf8').then((data) => res.json(JSON.parse(data)))
);

notes.post('/', (req, res) => {

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

        res.json(response);
    }
    else {
        res.json('There was in error in posting your note');
    }

})

notes.delete('/:id', (req, res) => {

    const requestedID = req.params.id;
    const updatedNotes = []


    for (let i = 0; i < dbNotes.length; i++) {
        const dbId = dbNotes[i].id
        console.log(dbId)
        if (requestedID !== dbId) {
            updatedNotes.push(dbNotes[i]);
        }
    }

    writeToFile(fs.)
res.json(updatedNotes);
return 

})


module.exports = notes


