'use strict';

const _ = require('lodash');
const mongoose = require('mongoose');
const Question = mongoose.model('Question');
const scoreLogic = require('../services/quiz/score-logic');

module.exports.startQuiz = startQuizPage;
module.exports.getQuizData = getQuizData;
module.exports.getQuestions = getQuizQuestions;
module.exports.generateQuiz = generateQuiz;
module.exports.takeQuizPage = takeQuizPage;
module.exports.calculateEndTime = calculateEndTime;
module.exports.solveQuizRes = solveQuizRes;
module.exports.generateQuizEnd = generateQuizEnd;
module.exports.renderCorrect = renderCorrect;

function startQuizPage (req, res) {
  res.render('quiz/start-quiz');
}

function getQuizData (req, res, next) {
  var data = _.pick(req.body, 'category', 'difficulty', 'questions');

  if(isNaN(data.questions)) {
    return res.status(401).json({ message: "The number of questions should be a number" });
  }
  //console.log(data.questions);
  //console.log(typeof data.questions);
  //console.log('isnan', isNaN(data.questions))

  req.resources.nrOfQuestions = parseInt(data.questions);
  req.resources.questionTypes = {
    categories: data.category.split(","),
    difficulty: data.difficulty
  };

  next();
}

function getQuizQuestions (req, res, next) {
  var categories = req.resources.questionTypes.categories;
  var difficultyLvl = req.resources.questionTypes.difficulty;
  var query = {};

  query.categories = {
    $in: categories
  };
  query.difficultyLvl = difficultyLvl;

  Question
  .find(query)
  .exec(function(err, results) {
    if (err) {
      console.log(err);
      return next(err);
    }

    //console.log('res', results);
    req.resources.quizQuestions = results;
    next();
  });

  //need a query that matches documents that have at least one
  //category from the categories array
  //and the given difficulty level
  //use match operator
  //Question
  //.search({
  //  query: {
  //    bool: {
  //      filter: [{
  //        terms: {
  //          category: categories
  //        }
  //      },{
  //        term: {difficulty: difficultyLvl}
  //      }]
  //    }
  //  }
  //},
  //{ hydrate:true },
  //function(err,results) {
  //  if (err) {
  //    return res.status(401).json({ message: err });
  //  }
  //  console.log(777, results.hits.hits);
  //  //res.json(results)
  //
  //  req.resources.quizQuestions = results.hits.hits;
  //  next();
  //});
}

function generateQuiz (req, res, next) {
  var nrOfQuestions = req.resources.nrOfQuestions;
  var questions = req.resources.quizQuestions;
  var finalQuestions = [];
  var chosenNr = [];

  //console.log('nrOfQuestions', nrOfQuestions);
  //console.log('finallen', finalQuestions.length);
  //console.log('resulted', questions.length);

  while (finalQuestions.length < nrOfQuestions) {
    var random = _.random(0, questions.length - 1);

    //console.log(random)
    //console.log('if', !_.includes(chosenNr, random));

    if (!_.includes(chosenNr, random)) {
      chosenNr.push(random);
      //console.log('chosen', chosenNr)
      finalQuestions.push(questions[random]);
    }
  }
  console.log('!!!!!!!', finalQuestions);
  req.session.finalQuestions = finalQuestions;
  next();
  //return res.redirect(304, '/quiz');
}

function calculateEndTime (req, res, next) {
  var time = new Date();
  var finalTime;
  //console.log('time', time);

  var difficulty = req.resources.questionTypes.difficulty;
  var questionsLen = req.session.finalQuestions.length;

  if (difficulty == 'easy') {
    finalTime = 2 * questionsLen;
  } else if (difficulty == 'intermediate') {
    finalTime = 4 * questionsLen;
  } else {
    finalTime = 7 * questionsLen;
  }
  //console.log('final', finalTime);
  //console.log('!!!', time.getHours() + ':' + time.getMinutes());

  var newTime = new Date(time.getTime() + finalTime*60000);
  console.log('???', newTime)
  console.log('???', newTime.getHours() + ':' + newTime.getMinutes())

  req.session.finalTime = {
    date: newTime,
    minutes: finalTime
  };
  next();
}

function generateQuizEnd (req, res) {
  return res.redirect(304, '/quiz');
}

function takeQuizPage (req, res) {
  res.render('quiz/take-quiz', {
    questions: req.session.finalQuestions,
    time: req.session.finalTime,
    historyData: req.session.historyData
  })
}

//function prepareQuery (req, res, next) {
//  var query = {};
//  query.find = query.find || {};
//
//  var ids = _.map(req.resources.objAnswers, '_id');
//
//  query.find.answers = {
//    $elemMatch: {
//      _id: {
//        $in: ids
//      }
//    }
//  };
//
//  req.resources.query = query;
//  next();
//}

//function checkCorrect (req, res, next) {
//  var userAnsers = req.resources.initialAnswers;
//  var score = 0;
//
//
//  Question
//  .find(req.resources.query.find)
//  .select('+answers.correct')
//  .exec(function (err, result) {
//    if (err) {
//      return next(err);
//    }
//
//    for (var i = 0; i < result.length; i++) {
//      var correctAnswers = scoreLogic.checkAnswers(result[i].answers, userAnsers);
//
//
//    }
//    console.log(score);
//    req.resources.score = score;
//    next();
//  })
//}

function solveQuizRes (req, res, next) {
  var questionData = {
    score: req.resources.score,
    correctAnswers: req.session.historyData.correct
  };
  res.json(questionData);
  //return res.redirect(304, '/quiz-answers');
}

function renderCorrect(req, res, next) {
  console.log('in render corrct')
  res.render('quiz/take-quiz', {
    questions: req.session.finalQuestions,
    correctAnswers: req.session.historyData.correct,
    score: req.session.historyData.score
  })
}