'use strict';

const passport = require('passport');

module.exports.signinJSON = signinJSON;
module.exports.signinPage = signinPage;

function signinJSON(req, res, next) {

}

function signinPage(req, res, next) {
  console.log(11);
  res.render('auth/signin');
}