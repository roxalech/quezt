'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

var AnswerSchema = new Schema({
  question: {
    type: ObjectId,
    ref: 'Question',
    required: true
  },
  body : {
    type:String
  },
  correct: {
    type: Boolean,
    select: false
  },
  weight: {
    type: Number,
    default: 0
  }
});

module.exports =  mongoose.model('Answer', AnswerSchema)