'use strict';

const session = require('express-session');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const passport = require('passport');
const MongoStore = require('connect-mongo')(session);
const nunjucks = require('nunjucks');
const config = require('./index');

module.exports.init = function (app) {
  var root = app.get('root');

  var sessionOpts = {
    secret: config.session.secret,
    resave: config.session.resave,
    saveUninitialized: config.session.saveUninitialized
  };

  app.set('views', root + '/app/views');
  app.set('view engine', 'html');

  var env = new nunjucks.Environment(new nunjucks.FileSystemLoader('views'));
  nunjucks.configure('views', {
    autoescape: true,
    express   : app
  });

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