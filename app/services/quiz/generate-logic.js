'use strict';

const _ = require('lodash');

module.exports.formatQuestions = formatQuestions;
module.exports.verifyParameters = verifyParameters;

//adds answers arr to question objects
function formatQuestions (req, res, next) {
  var questionArr = req.resources.quizQuestions;
  var answerArr = req.resources.answers;

  for (var i = 0; i < questionArr.length; i++) {
    questionArr[i] = questionArr[i].toObject();
    questionArr[i].answers = [];

    for( var j = 0; j < answerArr.length; j++) {
      if (answerArr[j].question.toString() == questionArr[i]._id.toString()) {
        questionArr[i].answers.push(answerArr[j]);
      }
    }
    //console.log('final', questionArr[i])
  }

  console.log('Generate logic service FORMAT QUESTIONS ', questionArr);
  req.resources.quizQuestions = questionArr;
  next();
}

function verifyParameters (req, res, next) {
  var nrOfQuestions = req.resources.nrOfQuestions;
  var questions = req.resources.quizQuestions;

  req.session.historyData = {};

  if (nrOfQuestions > questions.length) {
    return res.status(401).json({message: "There aren't enough questions matching your parameters. There are only " + questions.length + ' available'});
  }

  if (nrOfQuestions > 20) {
    return res.status(401).json({ message: "The number of questions  exceeds the maximum limit" });

  } else if (nrOfQuestions < 1) {

    return res.status(401).json({ message: "The number of questions  is under the minimum limit" });
  }

  req.resources.nrOfQuestions = nrOfQuestions;
  next();
}