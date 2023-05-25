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

// TODO: Add app.delete code

module.exports = app;
