'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var StatisticsSchema = new Schema({
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
  /** nr of quizzes accomplished */
  quizzesTaken: {
    type: Number,
    default: 0
  },
  /** nr of questions added */
  questions: {
    type: Number,
    default: 0
  },
  badges: [
    {
      badgeType:{
        type: String
      },
      receivedAt: {
        type: Date
      }
    }
  ]
  //challenges: [
  //  {
  //    challenge: {
  //      type: ObjectId
  //      //need ref to the Challenges model
  //    },
  //    result: {
  //      type: Number,
  //      default: 0
  //    },
  //    createdAt: {
  //      type: Date,
  //      default: Date.now
  //    },
  //    completed: {
  //      type: Date
  //    }
  //  }
  //]
});

StatisticsSchema.statics.createStatistic = function(userId, callback) {
  var data = {
    user: userId,
    badges: []
  };
  this.model('Statistics').create(data, function(err, statistic) {
    if (err) {
     return callback(err, null);
    }

    callback(null, statistic);
  });
};
module.exports = mongoose.model('Statistics', StatisticsSchema);