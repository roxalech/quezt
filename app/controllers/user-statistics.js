'use strict';

const mongoose = require('mongoose');
const UserStatistics = mongoose.model('Statistics');
const ADD_QUESTION_SCORE = 20;

module.exports.updateScoreByQuestion = updateScoreByQuestion;
module.exports.updateScoreByQuiz = updateScoreByQuiz;
module.exports.getScore = getScore;

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
    });
  });
}

function updateScoreByQuiz(req, res, next) {
  console.log('SCORE!!!', req.session.historyData.score)
  UserStatistics
  .findOne({user: req.user._id}, function(err, statistics) {
    if (err) {
      return res.status(401).json({ message: 'User not found.' });
    }

    console.log('User statistic obj', statistics);
    statistics.score = statistics.score + req.session.historyData.score;
    statistics.quizzesTaken++;

    statistics.save(function(err, result) {
      if(err) {
        return res.status(401).json({ message: 'Couldn\'t update score' });
      }

      delete req.session.historyData.score;
      res.json(result);
    });
  });
}

function getScore(req, res, next) {
  UserStatistics
  .findOne({user: req.user._id}, function(err, statistics) {
    if(err) {
      console.log('GET SCORE - statistics ctrl err', err);
    }

    console.log('????',statistics);
    req.resources.score = statistics.score;
    next()
  });
}