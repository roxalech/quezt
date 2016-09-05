'use strict';

const mongoose = require('mongoose');
const UserStatistics = mongoose.model('Statistics');
const ADD_QUESTION_SCORE = 20;

module.exports.updateScoreByQuestion = updateScoreByQuestion;

function updateScoreByQuestion(req, res, next) {
  UserStatistics
  .findOne({user: req.user._id}, function(err, statistics) {
    if (err) {
      return res.status(401).json({ message: 'User not found.' });
    }

    console.log('User statistic obj', statistics);
    statistics.score = statistics.score + ADD_QUESTION_SCORE;
    statistics.questions++;
    statistics.save(function(err, result) {
      console.log('result', result);
      if(err) {
        return res.status(401).json({ message: 'Couldn\'t update score' });
      }

      next();
    })
  });
}