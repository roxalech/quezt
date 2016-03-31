'use strict';

var mongoose = require('mongoose');
var config = require('./index');

module.exports.init = init;
module.exports.load = initialData;
module.exports.create = createUser;

function init(app) {
  mongoose.connect(config.mongodb.uri);

  // If the Node process ends, cleanup existing connections
  process.on('SIGINT', cleanup);
  process.on('SIGTERM', cleanup);
  process.on('SIGHUP', cleanup);

  // add the mongoose object to the express app instance
  if (app) {
    app.set('mongoose', mongoose);
  }

  return mongoose;
};

function createUser(app) {
  var data = {
    username: 'test',
    email: 'test',
    name: 'test',
    role: 'admin'
  };

  mongoose.model('User').create(data, function(err, user) {
    if(err) {
      console.log(err);
    }
    console.log(user);
  });
}

function initialData(app) {
    // load initial groups
    mongoose.model('User').find(function(err, users) {
      if (err) {
        console.log(err);
      }
      console.log(users);
      app.set('users', users);
    });
  }

function cleanup() {
  mongoose.connection.close(function () {
    process.exit(0);
  });
}