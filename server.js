'use strict';

// Get process environment or set default environment to development
var ENV = process.env.NODE_ENV || 'development';

var http = require('http');
var express = require('express');
var config = require('./config'); //the index.js file is imported
var mongoose = require('./config/mongoose');
var models = require('./config/models');

//creating a new instance of express
var app = express();

//setting up express app variables
app.set('config', config);
// __dirname - The name of the directory that the currently executing script resides in.
app.set('root', __dirname); //-used to construct path string to files
app.set('env', ENV);

//creates a connection to the db
mongoose.init(app);
models.init(app);
//mongoose.create(app);
mongoose.load(app);



var server = http.createServer(app);

server.listen(config.port || 3000, config.hostname || 'localhost', function() {
  var addr = server.address();
  console.log(
    '%s is running, listening on %s:%s, environment: %s',
    config.app.name,
    addr.address,
    addr.port,
    ENV.toLowerCase()
  );
});

module.exports = app;