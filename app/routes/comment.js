'use strict';

const express = require('express');
const router = express.Router();
const auth = require('../middlewares/authentication');
const commentCtrl = require('../controllers/comment');
const forumCtrl = require('../controllers/forum');

router.post(
  '/topic/:hash/comment',
  auth.ensured,
  forumCtrl.findByHash,
  commentCtrl.create
);

//router.delete(
//  '/comments/:commentId/post/:hash',
//  auth.ensured,
//  commentCtrl.findById,
//  forumCtrl.findByHash,
//  commentCtrl.delete,
//  commentCtrl.jsonComment
//);


module.exports = router;
