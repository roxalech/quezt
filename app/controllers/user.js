'use strict';

const mongoose = require('mongoose');
const User = mongoose.model('User');
const _ = require('lodash');

module.exports.profilePage = profilePage;
module.exports.accountSettings = changeAccountSettings;
module.exports.accountPage = accountPage;


function profilePage (req, res) {
  res.render('user/profile', {
    user: req.user._id,
    //badges: req.resources.badges,
    //quizzes: req.resources.quizzes,
    //questions: req.resources.questions
  });
}

function changeAccountSettings(req, res) {
  var data = _.pick(req.body, 'name', 'username', 'email');

  User.findOne({username: req.user.username}, function(err, result) {
    var user = result;
    _.extend(user, data);

    user.save(function(err, result) {

      if (err && err.code === 11000) {
        var name = err.message.match(/email|username/);

        req.session.historyData = {
          errorMessage: "The name already exists.",
          type: 'unique'
          };

        return res.redirect(304, '/account');
      }

      if (err) {
        res.status(401).json({ message: 'Error occurred' });
      }

      req.login(result, function(err) {
        if (err) {
          res.status(401).json({ message: 'Session initialization failed' });
        }

        delete req.session.historyData;
        res.json(result);
      });
    });
  });
}

function accountPage (req, res) {
  res.render('user/account');
}

