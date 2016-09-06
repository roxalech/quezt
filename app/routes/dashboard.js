'use strict';

const express = require('express');
const router = express.Router();
const auth = require('../middlewares/authentication');
const dashboardCtrl = require('../controllers/dashboard');
const forumCtrl = require('../controllers/forum');
const commentCtrl = require('../controllers/comment');
const userStatistics = require('../controllers/user-statistics');

router.get(
  '/',
  auth.ensured,
  userStatistics.getScore,
  dashboardCtrl.dashboard
);

router.get(
  '/highscores',
  auth.ensured,
  dashboardCtrl.highscores
);

//forum routes
router.get(
  '/forum',
  auth.ensured,
  forumCtrl.getTopics,
  forumCtrl.forum
);

router.post(
  '/add-topic',
  auth.ensured,
  forumCtrl.addTopic,
  forumCtrl.forum
);

router.get(
  '/topics/:hash',
  auth.ensured,
  forumCtrl.getTopic,
  commentCtrl.getAll,
  forumCtrl.topic
);


module.exports = router;