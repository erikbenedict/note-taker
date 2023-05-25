const app = require("express").Router();
const { writeFile } = require("fs").promises;
let db = require("../db/db.json");

// * base URL at the begging of this file is http://localhost3001/api

app.get("/notes", (req, res) => res.json(db));

app.post("/notes", (req, res) => {
  let newNote = {
    title: req.body.title,
    text: req.body.text,
    id: Math.random(),
  };
  db.push(newNote);
  writeFile("./db/db.json", JSON.stringify(db));
  res.json(db);
});

// TODO: Add app.delete code

module.exports = app;
