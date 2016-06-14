'use strict';
const mongoose = require('mongoose');
const User = mongoose.model('User');
const _ = require('lodash');

module.exports.signinPage = signinPage;
module.exports.registerPage = registerPage;
module.exports.register = registerUser;

function registerUser (req, res, next) {
  req.session.historyData = req.body;
console.log(req.body)
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
