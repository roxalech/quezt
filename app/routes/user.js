'use strict';

const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');
const auth = require('../middlewares/authentication');
const userStatistics = require('../controllers/user-statistics');
const questionCtrl = require('../controllers/question');

router.get('/account',
  auth.ensured,
  userCtrl.accountPage
);

router.put('/account',
  auth.ensured,
  userCtrl.accountSettings
  //userCtrl.accountPage
);

router.get('/profile',
  auth.ensured,
  userStatistics.getUserStat,
  questionCtrl.getUserQuestions,
  userCtrl.profilePage
);

module.exports = router;