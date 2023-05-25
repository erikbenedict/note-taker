const app = require("express").Router();
const { writeFile } = require("fs").promises;
const { v4: uuidv4 } = require("uuid");
let db = require("../db/db.json");

// * base URL at the begging of this file is http://localhost3001/api

app.get("/notes", (req, res) => {
  try {
    res.json(db);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while retrieving the notes" });
  }
});

app.post("/notes", (req, res) => {
  try {
    const newId = uuidv4();
    let newNote = {
      title: req.body.title,
      text: req.body.text,
      id: newId,
    };
    db.push(newNote);
    writeFile("./db/db.json", JSON.stringify(db))
      .then(() => {
        res.json(db);
      })
      .catch((err) => {
        res
          .status(500)
          .json({ error: "An error occurred while saving the note" });
      });
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while creating the note" });
  }
});

app.delete("/notes/:id", (req, res) => {
  const id = req.params.id;

  // Find the index of the note with the given id
  const noteIndex = db.findIndex((note) => note.id === id);

  if (noteIndex !== -1) {
    // Remove the note from the array
    db.splice(noteIndex, 1);

    // Write the updated notes to the db.json file
    writeFile("./db/db.json", JSON.stringify(db))
      .then(() => {
        res.json(db);
      })
      .catch((err) => {
        res
          .status(500)
          .json({ error: "An error occurred while deleting the note" });
      });
  } else {
    res.status(404).json({ error: "Note not found" });
  }
});

module.exports = app;
