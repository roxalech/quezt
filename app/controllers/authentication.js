'use strict';

const mongoose = require('mongoose');
const User = mongoose.model('User');
const UserStatistics = mongoose.model('Statistics');
const passport = require('passport');
const _ = require('lodash');

module.exports.signinPage = signinPage;
module.exports.signin = signinUser;
module.exports.registerPage = registerPage;
module.exports.register = registerUser;
module.exports.signout = signout;

function signinUser (req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    if (err || !user) {
      req.session.historyData = info.message;
      return res.redirect('/signin');
    }

    req.logIn(user, function(err) {
      if (err) {
        return next(err);
      }

      res.redirect('/');
    });
  })(req, res, next);
}

function registerUser (req, res) {
  req.session.historyData = req.body;

  if (req.body.password !== req.body.password_confirm) {
    req.session.historyData.errorMessage = 'Password confirmation should match'; // 'Parola si confirma parola nu sunt la fel.'
    return res.redirect('/register');
  }

  if (!req.body.email) {
    req.session.historyData.errorMessage = 'Email field is missing'; // 'Parola si confirma parola nu sunt la fel.'
    return res.redirect('/register');
  }

  var userData = _.pick(req.body, 'name', 'email', 'password');

  User.register(userData, function(err, user) {
    console.log('CTRL Register err', err);

    if (err && (11000 === err.code || 11001 === err.code)) {
      req.session.historyData.errorMessage = 'E-mail is already in use.'; // 'Există deja un cont cu adresa de e-mail precizată.'
      return res.redirect('/register');
    }

    if (err) {
      req.session.historyData.errorMessage = 'Something went wrong, please try later.'; // 'A apărut o eroare, vă rugăm încercați mai târziu'
      return res.redirect('/register');
    }

    // create User statistic obj
    UserStatistics.createStatistic(user._id, function(err, response) {
      if (err) {
        console.log('ERROR in creating user statistic', err);
      }

      req.logIn(user, function(err) {
        console.log('LOGGED USER: ', user);
        req.session.historyData = undefined;
        res.redirect('/');
      });
    });
  });
};

function signinPage(req, res) {
  if (req.user) {
    delete req.session.historyData;
    return res.redirect('/');
  }

  res.render('auth/signin', {
    historyData: req.session.historyData
  });
  delete req.session.historyData;
}

function registerPage(req, res) {

  res.render('auth/register', {
    historyData: req.session.historyData
  });
  delete req.session.historyData;
}

function signout (req, res, next) {
  req.logout();
  delete req.session.historyData;
  res.redirect('/signin');
};

function handleResponse(status, data, req, res) {
  res.format({
    html: function() {
      req.session.historyData = data;
      res.redirect('/signin');
    },
    // just in case :)
    text: function() {
      req.session.historyData = data;
      res.redirect('/signin');
    },
    json: function() {
      res.status(status).json(data);
    }
  });
}