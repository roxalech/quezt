'use strict';

const express = require('express');
const router = express.Router();
const authCtrl = require('../controllers/authentication');

router.get('/signin', authCtrl.signinPage);
router.post('/signin', authCtrl.signin);

router.get('/register', authCtrl.registerPage);
router.post('/register', authCtrl.register);

router.get('/signout', authCtrl.signout);

module.exports = router;