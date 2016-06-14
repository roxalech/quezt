'use strict';

const express = require('express');
const router = express.Router();
const dashboardCtrl = require('../controllers/dashboard');
const auth = require('../middlewares/authentication');

router.get('/',
  auth.ensured,
  dashboardCtrl.dashboard
);


module.exports = router;