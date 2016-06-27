'use strict';

const express = require('express');
const router = express.Router();
const questionCtrl = require('../controllers/question');
const answerCtrl = require('../controllers/answer');
const auth = require('../middlewares/authentication');

router.get(
  '/add-question',
  auth.ensured,
  questionCtrl.addQuestionPage
);

router.post(
  '/add-question',
  auth.ensured,
  questionCtrl.addQuestion,
  answerCtrl.nrOfCorrect,
  answerCtrl.calculateWeight,
  answerCtrl.formatAnswer,
  answerCtrl.saveAnswers,
  questionCtrl.saveJSON
);

router.get(
  '/search-question',
  auth.ensured,
  questionCtrl.searchQuestion
);

router.post(
  '/match-questions',
  auth.ensured,
  questionCtrl.verifyMatches
);

module.exports = router;