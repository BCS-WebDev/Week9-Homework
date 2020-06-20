# Note Taker
BootCampSpot Web Development - Week 9 Homework

## Notes on Express & Notes
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Notes can be useful in keeping track of daily
tasks and short term to-do lists. They serve as reminders that people can set so that
they won't have to mentally keep track of tasks. These notes however, will have to
persist through sessions in order for them be useful.

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; In our prvious projects, any data that was input
only persisted within sessions, meaning that the data would no longer exist if the
browser was closed. Persistence of data can now be achieved via the means of a server.
The Express node package allows a backend to be set up as a server so that data can be
stored indefinitely.

## Motive & Action
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; This time we will implement a backend for an existing
frontend website. The website allows for the user to save notes, view saved notes, and
delete saved notes. A feature has been added to keep an unsaved note, to which the user can
return, if a saved note is clicked for viewing. Another feature to update the text content of
saved notes was implemented. 

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; On the server side, we will use express to set up 
routes to USE, GET, POST, & DELETE methods that accesses the database for notes and
responds with their respectice actions and responses. A notable feature is that if the user
tries to add a note with a title that exists within the database, the server will respond
with an error, alerting the user of the conflict.

## Installation
Install `node.js` and run `npm install` to install the necessary node packages.

* Installs:
    - express node package 
    - path node package

## Usage
- Run `node server.js` from the Develop directory to start the local server.
- In a web browser, navigate to `http://localhost:3000/` to open the home page.

## Questions
Contact: kevin1choi@gmail.com