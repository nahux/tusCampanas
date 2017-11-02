//Dependencias
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var expressJwt = require('express-jwt');
var config = require('./config.json');
var expressValidator = require('express-validator');

//Rutas
var campanas = require('./routes/campanas');
var grupos = require('./routes/grupos');
var trackings = require('./routes/trackings');
var user = require('./routes/user');
var token = require('./routes/token');

var app = express();

// Uso JWT para asegurar el acceso a la API de lugares restringidos
app.use('/api/', expressJwt({ secret: config.secret }).unless({ path: ['/api/users/authenticate', '/api/users/register'] }));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressValidator());
app.use(cookieParser())

app.use('/api/campanas', campanas);
app.use('/api/grupos', grupos);
app.use('/api/trackings', trackings);
app.use('/api/users', user);
app.use('/app/token', token);

//Llamado a app angular
app.use(express.static('../frontend'));

module.exports = app;
