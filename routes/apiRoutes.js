const app = require("express").Router();
const { writeFile } = require("fs").promises;
const { v4: uuidv4 } = require("uuid");
const newId = uuidv4();
let db = require("../db/db.json");

// * base URL at the begging of this file is http://localhost3001/api

app.get("/notes", (req, res) => res.json(db));

app.post("/notes", (req, res) => {
  let newNote = {
    title: req.body.title,
    text: req.body.text,
    id: newId,
  };
  db.push(newNote);
  writeFile("./db/db.json", JSON.stringify(db));
  res.json(db);
});

app.delete("/notes/:id", (req, res) => {
  const id = req.params.id;
  let noteIndex = -1;

  for (let i = 0; i < db.length; i++) {
    if (db[i].id === id) {
      noteIndex = i;
      break;
    }
  }

  if (noteIndex !== -1) {
    db.splice(noteIndex, 1);
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
