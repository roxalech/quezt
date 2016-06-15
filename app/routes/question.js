'use strict';

const express = require('express');
const router = express.Router();
const questionCtrl = require('../controllers/question');
const auth = require('../middlewares/authentication');

router.get('/add-question',
  auth.ensured,
  questionCtrl.searchQuestion,
  questionCtrl.addQuestionPage
);

router.post('/add-question',
  auth.ensured,
  questionCtrl.addQuestion
);


module.exports = router;