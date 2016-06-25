'use strict';

const express = require('express');
const router = express.Router();
const quizCtrl = require('../controllers/quiz');
const answerCtrl = require('../controllers/answer');
const auth = require('../middlewares/authentication');
const quizService = require('../services/quiz/generate-logic');
const solveQuizService = require('../services/quiz/score-logic');
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
  solveQuizService.formatAnswerArr,
  answerCtrl.getAnswers,
  solveQuizService.calculateScore,
  answerCtrl.showCorrectResult,
  answerCtrl.getAnswers,
  answerCtrl.correctAnswers,
  quizCtrl.solveQuizJSON
);


module.exports = router;