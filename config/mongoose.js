'use strict';

const mongoose = require('mongoose');
const config = require('./index');

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

function createQuestion(app) {
  var data = {
    content: 'this is a test',

  };


 // mongoose.model('Question').create(data, function(err, question) {
  data.save(function (err, question) {
    if(err) {
      console.log(err);
    }
    data.on('es-indexed', function(err, res){
      if (err) throw err;
      /* Document is indexed */
    });
   //console.log(question);
  });
}


function initialData(app) {
    // load initial groups
    mongoose.model('User').find(function(err, users) {
      if (err) {
        console.log(err);
      }
      //console.log(users);
      app.set('users', users);
    });
  }

function cleanup() {
  mongoose.connection.close(function () {
    process.exit(0);
  });
}