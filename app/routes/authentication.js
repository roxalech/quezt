'use strict';

const express = require('express');
const router = express.Router();
const authCtrl = require('../controllers/authentication');

router.get('/signin', authCtrl.signinPage);
router.post('/signin', authCtrl.signinJSON);

router.get('/register', authCtrl.registerPage);

module.exports = router;