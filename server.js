const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;
const notes = require('./routes/index')
const path = require( 'path' );
const { Router } = require('express');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/', notes);

app.use ( express.static('public') );

app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);

//wildcard page for anything not matching our set endpoints.
app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);


