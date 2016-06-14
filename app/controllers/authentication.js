'use strict';
const mongoose = require('mongoose');
const User = mongoose.model('User');
const _ = require('lodash');
const passport = require('passport');

module.exports.signinPage = signinPage;
module.exports.signin = signinUser;
module.exports.registerPage = registerPage;
module.exports.register = registerUser;
module.exports.signout = signout;

function signinUser (req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    if (err || !user) {
      // return res.status(400).send(info);

      return handleResponse(400, info, req, res);
    }
    req.logIn(user, function(err) {
      if (err) {
        return next(err);
      }

      //res.status(200).json(user);
      //if (req.body.signinType == 'modal') {
      //  return res.json(user);
      //}

      res.redirect('/');
    });
  })(req, res, next);
};

function registerUser (req, res) {
  req.session.historyData = req.body;

  if (req.body.password !== req.body.password_confirm) {
    req.session.historyData.errorMessage = 'Password confirmation should match'; // 'Parola si confirma parola nu sunt la fel.'
    return res.redirect('/register');
  }

  var userData = _.pick(req.body, 'name', 'email', 'password');

  User.register(userData, function(err, user) {
    if (err && (11000 === err.code || 11001 === err.code)) {
      req.session.historyData.errorMessage = 'E-mail is already in use.'; // 'Există deja un cont cu adresa de e-mail precizată.'
      return res.redirect('/signup');
    }

    if (err) {
      req.session.historyData.errorMessage = 'Something went wrong, please try later.'; // 'A apărut o eroare, vă rugăm încercați mai târziu'
      return res.redirect('/signup');
    }

    req.logIn(user, function(err) {
      req.session.historyData = undefined;
      res.redirect('/');
    });
  });
};

function signinPage(req, res) {

  res.render('auth/signin');
}

function registerPage(req, res) {

  res.render('auth/register');
}

function signout (req, res, next) {
  req.logout();
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