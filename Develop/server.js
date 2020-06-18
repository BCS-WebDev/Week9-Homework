
// Dependencies
const express = require("express");  // load express module
const path = require("path");    // load path module
const fs = require("fs");     // load file system module

// Set up Express App
const app = express();   // server instance
const PORT = process.env.PORT || 3000;  // start with dynamic port or 3000

// Set the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// USE routes
app.use('/assets/js/index.js', express.static(__dirname + "/public/assets/js/index.js"));   // path to index.js
app.use('/assets/css/styles.css', express.static(__dirname + "/public/assets/css/styles.css"));   // path to styles.css

// GET routes
app.get("/", function(req, res) {    // get home page
    res.sendFile(path.join(__dirname, "public/index.html"));    // send home page
});

app.get("/notes", function(req, res) {   // get notes page
    res.sendFile(path.join(__dirname, "public/notes.html"));    // send notes page
});

app.get("/api/notes", function(req, res) {    // get notes array
    const notes = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));   // read from db.json and parse

    return res.json(notes);   // return parsed notes array in response
});

// POST routes
app.post("/api/notes", function(req, res) {   // post new note
    var newNote = req.body;   // get request json object

    const notes = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));  // read from db.json and parse

    for (var i = 0; i < notes.length; i++) {   // check for duplicate title 
        if (newNote.title === notes[i].title) {    // if note title already exists
            res.status(500).send("Note Title already exists.");   // send error status 500 with error message

            return;  // return
        }
    }
    
    notes.push(newNote);    // else push note
    fs.writeFileSync("./db/db.json", JSON.stringify(notes));  // overwrite db.json with new stringified notes array

    res.status(200).send("New note added.");   // send success status 200 with success message
});

app.post("/api/notes/update", function(req, res) {   // update existing note
    var updateNote = req.body;   // get request json object

    const notes = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));  // read from db.json and parse

    for (var i = 0; i < notes.length; i++) {   // check for existing title 
        if (updateNote.title === notes[i].title) {    // if titles match
            notes[i].text = updateNote.text;   // update text

            break; // break loop
        }
    }
    
    fs.writeFileSync("./db/db.json", JSON.stringify(notes));  // overwrite db.json with new stringified notes array

    res.status(200).send("Note updated.");   // send success status 200 with success message
});

// DELETE routes
app.delete("/api/notes/:id", function(req, res) {   // delete target note
    var noteToDelete = req.params.id;   // get target note title from request parameter

    const notes = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));  // read from db.json and parse

    for (var i = 0; i < notes.length; i++) {   // find note in array
        if (noteToDelete === notes[i].title) {  // if note title matches
            notes.splice(i, 1);  // splice note

            fs.writeFileSync("./db/db.json", JSON.stringify(notes));  // overwrite db.json with new stringified notes array
            console.log("Note deleted.");   // console log message in server

            res.status(200).send("Note deleted.");   // send success status 200 with success message
            
            return;   // return
        }
    }
});

// Start the server to begin listening
app.listen(process.env.PORT || 3000, function() {
    console.log("App listening on PORT " + PORT);   // console log message in server
});
