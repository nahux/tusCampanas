var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var campanas = require('./routes/campanas');
var grupos = require('./routes/grupos');
var trackings = require('./routes/trackings');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser())

app.use('/api/campanas', campanas);
app.use('/api/grupos', grupos);
app.use('/api/trackings', trackings);

app.use(express.static('../frontend'));

module.exports = app;
