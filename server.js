const express = require('express');
const req = require('express/lib/request');
const {
    get
} = require('express/lib/response');
const path = require('path');
const notes = require("./db/db.json");
const fs = require('fs');

const PORT = process.env.PORT || 3001;
const app = express();


app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());
app.use(express.static('public'));

// Use apiRoutes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});

app.get('/api/notes', (req, res) => {
    let results = notes;
    res.json(results);
});

// POST route
app.post('/api/notes', (req, res) => {
    req.body.id = notes.length + 1;

    let notesArr = notes;
    let note = req.body;

    notesArr.push(note);
    fs.writeFileSync(
        path.join(__dirname, './db/db.json'),
        JSON.stringify(notesArr, null, 2)
    );

    res.json(note);

});

app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});