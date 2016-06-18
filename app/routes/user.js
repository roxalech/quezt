'use strict';

const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');
const auth = require('../middlewares/authentication');

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
  userCtrl.profilePage
);

module.exports = router;