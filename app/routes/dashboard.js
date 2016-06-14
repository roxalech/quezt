'use strict';

const express = require('express');
const router = express.Router();
const dashboardCtrl = require('../controllers/dashboard');

router.get('/', dashboardCtrl.dashboardPage);


module.exports = router;