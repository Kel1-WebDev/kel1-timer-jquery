'use strict';

// get environment variable from .env file
require('dotenv').config();

// intialize
var express = require('express'),
    app = express(),
    port = process.env.PORT || 3000,

    cors = require('cors');

app.use(cors());

// connect to routes
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

require('./api/timer')(app);

app.use(function (req, res) {
    res.status(404).send({ url: req.originalUrl + ' not found' })
});

// start server
app.listen(port);

console.log('RESTful API server started on: ' + port);

module.exports = app;
