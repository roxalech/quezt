'use strict';

const express = require('express');
const router = express.Router();
const quizCtrl = require('../controllers/quiz');
const answerCtrl = require('../controllers/answer');
const auth = require('../middlewares/authentication');
const quizService = require('../services/quiz/generate-logic');
const solveQuizService = require('../services/quiz/score-logic');
const userStatistics = require('../controllers/user-statistics');

router.get(
  '/start-quiz',
  auth.ensured,
  quizCtrl.startQuiz
);

router.post(
  '/start-quiz',
  auth.ensured,
  quizCtrl.getQuizData,
  quizCtrl.getQuestions,
  answerCtrl.getQuestionAnswers,
  quizService.formatQuestions,
  quizService.verifyParameters,
  quizCtrl.generateQuiz,
  quizCtrl.calculateEndTime,
  quizCtrl.generateQuizEnd
);

router.get(
  '/quiz',
  auth.ensured,
  quizCtrl.takeQuizPage
);

//TODO show correct answers
router.post(
  '/quiz-answers',
  auth.ensured,
  solveQuizService.formatAnswerArr, //transforms answers coming from request into mongoose object ids
  answerCtrl.getAnswers, //gets the corresponding answer objects from db
  solveQuizService.calculateScore, //depending on the correct answers
  answerCtrl.getCorrectResults,
  answerCtrl.getAnswers,
  answerCtrl.correctAnswers,
  quizCtrl.solveQuizRes
);

router.get(
  '/quiz-answers',
  quizCtrl.renderCorrect
);

router.post(
  '/save-score',
  userStatistics.updateScoreByQuiz
);




module.exports = router;