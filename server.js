const cors = require("cors")
const express = require('express');
const path = require('path');

const app = express();
const PORT = 3001;

const seed = require('./server/seed/seed.js');

seed();

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use('/api', require('./server/api'));

app.get('*', function (req, res) {
    res.sendFile( __dirname + "/public/index.html" );
})

app.listen(PORT, function() {
    console.log(`Listening to port: ${PORT}`);
});
