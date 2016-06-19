'use strict';

const express = require('express');
const router = express.Router();
const auth = require('../middlewares/authentication');
const dashboardCtrl = require('../controllers/dashboard');
const forumCtrl = require('../controllers/forum');

router.get('/',
  auth.ensured,
  dashboardCtrl.dashboard
);

router.get('/highscores',
  auth.ensured,
  dashboardCtrl.highscores
);

router.get('/forum',
  auth.ensured,
  forumCtrl.getTopics,
  forumCtrl.forum
);

module.exports = router;