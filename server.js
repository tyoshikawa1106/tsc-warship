var express = require('express');
var app = express();
var port = process.env.PORT || 8080;

var path = require('path');
var favicon = require('serve-favicon');

// Require Routes js
var routesIndex = require('./routes/index');

// Serve static files
app.use(express.static(__dirname + '/public'));
app.use(favicon(path.join(__dirname, 'public', '/images/favicon.ico')));

// Page Routes
app.use('/', routesIndex);

// View Engine To ejs
app.set('view engine', 'ejs');

// Served Localhost
console.log('Served: http://localhost:' + port);
app.listen(port);