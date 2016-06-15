'use strict';

const express = require('express');
const router = express.Router();
const quizCtrl = require('../controllers/question');
const auth = require('../middlewares/authentication');

router.get('/start-quiz',
  auth.ensured,
  quizCtrl.addQuestionPage
);



module.exports = router;