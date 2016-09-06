'use strict';

const _ = require('lodash');
const mongoose = require('mongoose');

//module.exports.checkAnswers = checkAnswers;
module.exports.calculateScore = calculateScore;
module.exports.formatAnswerArr = formatAnswerArr;

//function checkAnswers (answers, userAnswers) {
//  var correctAnswers = [];
//  var answersIds = [];
//
//  for (var i = 0; i < userAnswers.length; i++) {
//    answersIds.push(userAnswers[i].answer);
//  }
//  console.log('!!!!', answersIds);
//
//  //iterate through the array of answers saved for a question
//  for (var j = 0; j < answers.length; j++) {
//    //console.log('in for', answers[j].correct)
//
//    if (answers[j].correct === true) {
//      //console.log('cooret', answers[j]._id);
//      //console.log('ids', ids);
//      //console.log('ids',typeof ids[0]);
//      //console.log('includes', _.includes(ids,  answers[j]._id));
//
//
//      // /check if the user has selected the correct answer
//      if(_.includes(answersIds,  answers[j]._id.toString())) {
//        correctAnswers.push(userAnswers[j]);
//      }
//    }
//  }
//  console.log('correct', correctAnswers);
//  return correctAnswers;
//}

function calculateScore (req, res, next) {
  req.session.historyData = req.session.historyData || {};
  var answers = req.resources.answers;
  var score = 0;

  console.log('answers', answers)
  for (var i = 0; i < answers.length; i++) {
    if(answers[i].correct == true) {
      console.log('in if')
      score = score + answers[i].weight;
    }
  }

  console.log('QUIZ score', score)
  req.resources.score = Math.round(score);
  req.session.historyData.score = Math.round(score);
  next();
}



function formatAnswerArr (req, res, next) {
  delete req.session.historyData.correct;

  var userAnswers = req.body.userAnswers;
  var answerIds = [];

  for(var i = 0; i < userAnswers.length; i++) {
    var objId = mongoose.Types.ObjectId(userAnswers[i]);
    answerIds.push({_id: objId});
  }

 // console.log('mongooseObjId', answerIds);
  req.resources.answerIds = answerIds;
  next();
}