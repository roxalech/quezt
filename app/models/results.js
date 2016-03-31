'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var ResultsSchema = new Schema({
  user: {
    type: ObjectId,
    ref: 'User',
    required: true
  },
  /** calculated by an algorithm
   *  nr of challenges accomplished (biggest percentage),
   *  nr of questions added (smaller percentage),
   *  nr of topics added (smaller percentage)
   */
  score: {
    type: Number,
    default: 0
  },
  /** nr of challenges accomplished */
  completedChallenges: {
    type: Number,
    default: 0
  },
  /** nr of questions added */
  questions: {
    type: Number,
    default: 0
  },
  /** nr of topics added */
  topics: {
    type: Number,
    default: 0
  },
  challenges: [
    {
      challenge: {
        type: ObjectId
        //need ref to the Challenges model
      },
      result: {
        type: Number,
        default: 0
      },
      createdAt: {
        type: Date,
        default: Date.now
      },
      completed: {
        type: Date
      }
    }
  ]
});

module.exports = mongoose.model('Results', ResultsSchema);