'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var CommentSchema = new Schema({
  user: {
    type: ObjectId,
    ref: 'User',
    required: true
  },
  topic: {
    type: ObjectId,
    ref: 'Forum',
    select: false,
    required: true
  },
  topicHash: {                   // post entity `hash` property
    type: String,
    required: true
  },
  body: {
    type: String,
    //required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Comment', CommentSchema);
