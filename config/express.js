'use strict';

const session = require('express-session');
const bodyParser = require('body-parser');
const expressValidatior = require('express-validator');
const passport = require('passport');
const MongoStore = require('connect-mongo')(session);

module.exports.init = function (app) {
  var sessionOpts = {
    secret: config.session.secret,
    resave: config.session.resave,
    saveUninitialized: config.session.saveUninitialized
  };

  app.use(expressValidator());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());

  if (config.session.type === 'mongo') {
    sessionOpts.store = new MongoStore({
      url: config.mongodb.uri
    });
  }

  app.use(session(sessionOpts));
  app.use(passport.initialize());
  app.use(passport.session());
};