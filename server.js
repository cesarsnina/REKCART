const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

const seed = require('./server/seed/seed.js');

seed();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use('/api', require('./server/api'));

app.listen(PORT, function() {
    console.log(`Listening to port: ${PORT}`);
});
