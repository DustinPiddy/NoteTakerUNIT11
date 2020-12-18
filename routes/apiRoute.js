var path = require("path");
var fs = require("fs");
const dbPath = require("../db/db.json");

module.exports = function (app) {
  app.get("/api/notes", function (req, res) {
    fs.readFile(dbPath, "utf8", (err, data) => {
      if (err) throw err;
      console.log(data);
      res.json(data);
    });
  });

  app.post("/api/notes", function (req, res) {
    fs.readFile(dbPath, "utf8", (err, data) => {
      if (err) throw err;
      let noteList;
      if (data) {
        noteList = JSON.parse(data);
      }
      let newNote = req.body;
      newNote.id = uuid.v4();
      if (noteList) {
        noteList.push(newNote);
      } else {
        noteList = newNote;
      }
      fs.writeFile(dbPath, JSON.stringify(noteList), function (err, data) {
        if (err) throw err;
        console.log("Made a new note. Note id: " + newNote.id);
        res.json(newNote);
      });
    });
  });

  app.delete("api/notes/:id", function (req, res) {
    const noteId = req.params.id;
    fs.readFile(dbPath, "utf8", (err, data) => {
      if (err) throw err;
      const noteList = JSON.parse(data).filter((note) => note.id !== noteId);
      fs.writeFile(dbPath, JSON.stringify(noteList), (err) => {
        if (err) throw err;
        console.log("Deleted note.");
        res.status(200).send();
      });
    });
  });
};
