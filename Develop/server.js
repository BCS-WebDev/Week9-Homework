
// Dependencies
const express = require("express");
const path = require("path");
const fs = require("fs");
const { resolveNaptr } = require("dns");

// Set up Express App
const app = express();
const PORT = process.env.PORT || 3000;  // start with dynamic port or 3000

// Set the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// USE routes
app.use('/assets/js/index.js', express.static(__dirname + "/public/assets/js/index.js"));
app.use('/assets/css/styles.css', express.static(__dirname + "/public/assets/css/styles.css"));

// GET routes
app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "public/index.html"));
});

app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "public/notes.html"));
});

app.get("/api/notes", function(req, res) {
    // read from db.json and parse, check if exists & create if doesn't
    const notes = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));

    return res.json(notes);
});

// POST routes
app.post("/api/notes", function(req, res) {
    var newNote = req.body;

    // read from db.json, parse, push, stringify, overwrite
    const notes = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));

    for (var i = 0; i < notes.length; i++) {   // check for duplicate title 
        if (newNote.title === notes[i].title) {
            res.status(500).send("Note Title already exists.");

            return;
        }
    }
    
    notes.push(newNote);
    fs.writeFileSync("./db/db.json", JSON.stringify(notes));

    res.status(200).send("New note added.");
});

// DELETE routes
app.delete("/api/notes/:id", function(req, res) {
    var noteToDelete = req.params.id;

    // read from db.json, parse, splice, overwrite
    const notes = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));

    for (var i = 0; i < notes.length; i++) {
        if (noteToDelete === notes[i].title) {
            notes.splice(i, 1);  // splice

            fs.writeFileSync("./db/db.json", JSON.stringify(notes));
            console.log("Note deleted.")

            res.status(200).send("Note deleted.");
            
            return;
        }
    }
});

// Start the server to begin listening
app.listen(process.env.PORT || 3000, function() {
    console.log("App listening on PORT " + PORT);
});
