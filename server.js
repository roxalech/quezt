'use strict';

// Get process environment or set default environment to development
const ENV = process.env.NODE_ENV || 'development';

const http = require('http');
const express = require('express');
const config = require('./config'); //the index.js file is imported
const mongoose = require('./config/mongoose');
const models = require('./config/models');
const expressFile = require('./config/express');
const routes = require('./config/routes');


//creating a new instance of express
const app = express();

//setting up express app variables
app.set('config', config);
// __dirname - The name of the directory that the currently executing script resides in.
app.set('root', __dirname); //-used to construct path string to files
app.set('env', ENV);

//creates a connection to the db
mongoose.init(app);
models.init(app);
//mongoose.create(app);
expressFile.init(app);
routes.init(app);
mongoose.load(app);



const server = http.createServer(app);

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