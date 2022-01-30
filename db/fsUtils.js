//require the file system to do the writing, reading, and appending functions.
const fs = require('fs');
//require util for the promisify function w/readfile
const util = require('util');

//helper function so we can use the .then
const readFromFile = util.promisify(fs.readFile);

//write to file, reusable on notes.js. This was giving me issues so I used a separate formula on notes, but keeping this here for future trial and error with this project.
const writeToFile = (destination, content) =>
  fs.writeFile(destination, JSON.stringify(content, null, 4), (err) =>
    err ? console.error(err) : console.info(`\nData written to ${destination}`)
  );

/**
 *  Function to read data from a given a file and append some content
 *  @param {object} content The content you want to append to the file.
 *  @param {string} file The path to the file you want to save to.
 *  @returns {void} Nothing
 */

const readAndAppend = (content, file) => {
    fs.readFile(file, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
        } else {
            const parsedData = JSON.parse(data);
            parsedData.push(content);
            writeToFile(file, parsedData)
        }
    });
};
//export all helper functions :)
module.exports = { writeToFile, readFromFile, readAndAppend }