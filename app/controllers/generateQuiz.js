'use strict';

const _ = require('lodash');
const mongoose = require('mongoose');
const Question = mongoose.model('Question');

function startQuizPage (req, res) {
  res.render('quiz/start-quiz', {
    historyData: req.session.historyData
  });
}