'use strict';

const passport = require('passport');
const mongoose = require('mongoose');

//const User = mongoose.model('User');

module.exports.init = function (app) {


  passport.serializeUser(function (user, done) {
    //console.log('PASSPORT user', user);
    //console.log('PASSPORT done', done);
    done(null, user);

  //done(null, user.id);
});

  passport.deserializeUser(function (user, done) {

    //User.findById(id, done);

    done(null, user);
});

  require('./strategies/local')();
};

