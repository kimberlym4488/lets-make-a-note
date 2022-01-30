const router = require('express').Router();
// Import our modular routers for /tips and /feedback
const notesRouter = require('./notes');

//defines my endpoint for the notesRouter which will be used in server.js and notes.js
router.use('/api/notes', notesRouter);

//Initialize router route
module.exports = router;
