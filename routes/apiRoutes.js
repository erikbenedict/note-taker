const app = require('express').Router();
const { writeFile } = require('fs').promises;
const { v4: uuidv4 } = require('uuid');
let db = require('../db/db.json');

// **** base URL at the begging of this file is 'http://localhost3001/api'(local) ****

// * GET route to retrieve all notes
app.get('/notes', (req, res) => {
  try {
    res.json(db);
  } catch (error) {
    res
      .status(500)
      .json({ error: 'An error occurred while retrieving the notes' });
  }
});

// * POST route to create a new note
app.post('/notes', (req, res) => {
  try {
    const newId = uuidv4(); //* Generate a unique ID for each new note
    let newNote = {
      title: req.body.title,
      text: req.body.text,
      id: newId,
    };
    db.push(newNote);
    writeFile('./db/db.json', JSON.stringify(db))
      .then(() => {
        res.json(db);
      })
      .catch((err) => {
        res
          .status(500)
          .json({ error: 'An error occurred while saving the note' });
      });
  } catch (error) {
    res
      .status(500)
      .json({ error: 'An error occurred while creating the note' });
  }
});

// * DELETE route to delete a note by ID
app.delete('/notes/:id', (req, res) => {
  const id = req.params.id;
  const noteIndex = db.findIndex((note) => note.id === id); // * Find the index of the note with the given id

  if (noteIndex !== -1) {
    db.splice(noteIndex, 1); // * Remove the note from the array
    writeFile('./db/db.json', JSON.stringify(db))
      .then(() => {
        res.json(db);
      })
      .catch((err) => {
        res
          .status(500)
          .json({ error: 'An error occurred while deleting the note' });
      });
  } else {
    res.status(404).json({ error: 'Note not found' });
  }
});

module.exports = app;
