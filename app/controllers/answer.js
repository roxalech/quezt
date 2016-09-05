'use strict';

const _ = require('lodash');
const mongoose = require('mongoose');
const Answer = mongoose.model('Answer');

module.exports.saveAnswers = saveAnswers;
module.exports.calculateWeight = calculateWeight;
module.exports.nrOfCorrect = nrOfCorrect;
module.exports.formatAnswer = formatAnswer;
module.exports.getQuestionAnswers = getQuestionAnswers;
module.exports.getAnswers = getAnswers;
module.exports.getCorrectResults = getCorrectResults;
module.exports.correctAnswers = correctAnswers;

function nrOfCorrect (req, res, next) {
  var answerArr = req.body.answers;
  var nrOfCorrect = 0;

  for (var i = 0; i < answerArr.length; i++) {
    if (answerArr[i].correct){
      console.log('in is correct')
      nrOfCorrect ++;
    }
  }

  req.resources.nrOfCorrect = nrOfCorrect;
  next();
}

function calculateWeight (req, res, next) {
  var difficulty = req.resources.question.difficultyLvl;
  var answerType = req.resources.question.answersType;
  var nrOfCorrect = req.resources.nrOfCorrect;
  var weight;

  if (_.includes(difficulty, 'hard')) {
    //console.log('in hard');
    weight = 20;
  } else if ( _.includes(difficulty, 'easy')) {
    weight = 5;
  } else if ( _.includes(difficulty, 'medium')) {
    weight = 10;
  }

  if (_.includes(answerType, 'multiple')) {
    weight = weight / nrOfCorrect;
  }

  console.log('weight', weight);
  req.resources.weight = weight;
  next();
}

function formatAnswer (req, res, next) {
  var answerArr = req.body.answers;
  var weight = req.resources.weight;

  for (var i = 0; i < answerArr.length; i++) {
    if (answerArr[i].correct){
      answerArr[i].weight = weight;
    } else {
      answerArr[i].weight = 0;
    }
  }

  //console.log('answerArr', answerArr);
  req.resources.answers = answerArr;
  next();
}

function saveAnswers (req, res, next) {
  var answerArr = req.resources.answers;
  var question = req.resources.question;
  var isSaved = 0;

  for (var i = 0; i < answerArr.length; i++) {
    var data = {
      body:  answerArr[i].body,
      correct: answerArr[i].correct,
      weight: answerArr[i].weight,
      question: question._id
    };
    //console.log('answerObj ', data);

    Answer
    .create(data, function(err, result) {
      if (err) {
        return res.status(401).json({ message: "Couldn't save answers" });
      }

      isSaved ++;
      if (isSaved == answerArr.length) {
        console.log('isSaved', isSaved);
        next();
      }
    });
  }
}

function getQuestionAnswers (req, res, next) {
  var questionArr = req.resources.quizQuestions;
  console.log('CTRL getQuestionAnswers array', questionArr);

  var ids = _.map(questionArr, '_id');

  Answer
  .find({question: { $in: ids }}, function (err, result) {
    if (err) {
      console.log('CTRL getQuestionAnswers err', err);
      return next(err);
    }

    console.log('CTRL getQuestionAnswers answers: ', result)
    req.resources.answers = result;
    next();
  })
}

function getAnswers (req, res, next) {
  //the answers user has chosen to be correct
  var answerIds = req.resources.answerIds;
  var answers = [];

  //console.log('userAnswers', answerIds);
  Answer
  .find({_id: { $in: answerIds }})
  .select('+correct')
  .exec(function (err, result) {
    if (err) {
      console.log(err);
      return next(err);
    }

    //console.log('answers', result)
    req.resources.answers = result;
    next();
  });
}

function getCorrectResults (req, res, next) {
  var quizQuestions = req.session.finalQuestions;
  console.log('??', quizQuestions);

  var ids = _.map(quizQuestions, '_id');
  Answer
  .find({question: { $in: ids }})
  .select('+correct')
  .exec(function (err, result) {
    if (err) {
      console.log(err);
      return next(err);
    }

    console.log('answers', result)
    req.resources.correctAnswers = result;
    next();
  })
}

function correctAnswers (req, res, next) {
  //TODO Delete History data on page reload
  req.session.historyData = req.session.historyData || {};
  req.session.historyData.correct =  req.resources.correctAnswers;
  next();
}
