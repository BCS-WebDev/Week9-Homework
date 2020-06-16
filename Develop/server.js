
// Dependencies
const express = require("express");
const path = require("path");
const fs = require("fs");

// Set up Express App
const app = express();
const PORT = process.env.PORT || 3000;  // start with dynamic port or 3000

// Set the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// TODO - status codes - i.e. res.writeHead(200, { "Content-Type": "text/html" });

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
    
    notes.push(newNote);
    fs.writeFileSync("./db/db.json", JSON.stringify(notes));

    console.log("New note added.");
});

// DELETE routes
app.delete("/api/notes/:id", function(req, res) {
    var noteToDelete = req.params.id;

    // read from db.json, parse, splice, overwrite
    const notes = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));

    for (var i = 0; i < notes.length; i++) {
        if (noteToDelete === notes[i].title) {
            notes.splice(i, 1);  // splice

            return;
        }
    }

    fs.writeFileSync("./db/db.json", JSON.stringify(notes));

    console.log("Note deleted.")
});


// Start the server to begin listening
app.listen(process.env.PORT || 3000, function() {
    console.log("App listening on PORT " + PORT);
});
