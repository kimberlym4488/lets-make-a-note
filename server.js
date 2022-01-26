const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;
const notes = require('./routes/index')
const path = require( 'path' );
const { Router } = require('express');
//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/', notes);
//public folders available
app.use ( express.static('public') );

//get route for our home page before anything is clicked. localhost.3001

app.get('/notes', (req, res) => {
  console.info(`${req.method} request received to get notes, should only appear on first load`); 
  return res.sendFile(path.join(__dirname, '/public/notes.html'))
});

//wildcard page for anything not matching our set endpoints.
app.get('*', (req, res) => {
  console.info(`${req.method} request received on unknown parameter, should only be seen if /notes not target`);
  res.sendFile(path.join(__dirname, '/public/index.html'))
});
//port to listen on
app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);


