'use strict';

const express = require('express');
const router = express.Router();
const quizCtrl = require('../controllers/quiz');
const auth = require('../middlewares/authentication');

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
  quizCtrl.generateQuiz
);

router.get(
  '/quiz',
  auth.ensured,
  quizCtrl.takeQuizPage
);


module.exports = router;