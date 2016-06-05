'use strict';

const session = require('express-session');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const passport = require('passport');
const MongoStore = require('connect-mongo')(session);
const nunjucks = require('nunjucks');
const config = require('./index');
const path = require('path');
const serveStatic = require('serve-static');

module.exports.init = function (app) {
  var root = app.get('root');

  var sessionOpts = {
    secret: config.session.secret,
    resave: config.session.resave,
    key: 'skey.sid',
    saveUninitialized: config.session.saveUninitialized
  };

  var opts = {};
  if (!config.nunjucks.cache) {
    opts.noCache = true;
  }

  if (config.nunjucks.watch) {
    opts.watch = true;
  }

  var loader = new nunjucks.FileSystemLoader(path.join(root, 'app/views'), opts);
  var nunjucksEnv  = new nunjucks.Environment(loader);
  nunjucksEnv.express(app);

  app.set('view engine', 'html');
  app.engine('html', nunjucks.render);

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

  app.use(function(req, res, next) {
    res.locals.baseUrl = config.baseUrl;

    next();
  });
};