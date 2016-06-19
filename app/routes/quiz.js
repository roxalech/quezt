'use strict';

const express = require('express');
const router = express.Router();
const quizCtrl = require('../controllers/quiz');
const auth = require('../middlewares/authentication');

router.get('/start-quiz',
  auth.ensured,
  quizCtrl.startQuiz
);

router.post('/start-quiz',
  auth.ensured,
  quizCtrl.generateQuiz
);



module.exports = router;