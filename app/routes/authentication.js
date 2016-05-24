'use strict';

const express = require('express');
const router = express.Router();
const authCtrl = require('../controllers/authentication');

router.post('/signin', authCtrl.signinJSON);