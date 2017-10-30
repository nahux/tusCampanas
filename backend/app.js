var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');


var express = require('express');
var app = express();
var session = require('express-session');
var bodyParser = require('body-parser');
var expressJwt = require('express-jwt');
var config = require('./config.json');

var campanas = require('./routes/campanas');
var grupos = require('./routes/grupos');
var trackings = require('./routes/trackings');
var user = require('./routes/user');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser())

app.use('/api/campanas', campanas);
app.use('/api/grupos', grupos);
app.use('/api/trackings', trackings);
app.use('/api/user', user);

app.use(express.static('../frontend'));

module.exports = app;
