'use strict';

const _ = require('lodash');
const mongoose = require('mongoose');
const Question = mongoose.model('Intrebare');

module.exports.startQuiz = startQuizPage;
module.exports.getQuizData = getQuizData;
module.exports.getQuestions = getQuizQuestions;
module.exports.generateQuiz = generateQuiz;
module.exports.takeQuizPage = takeQuizPage;

function startQuizPage (req, res) {
  res.render('quiz/start-quiz');
}

function getQuizData (req, res, next) {
  var data = _.pick(req.body, 'category', 'difficulty', 'questions');

  if(isNaN(data.questions)) {
    return res.status(401).json({ message: "The number of questions should be a number" });
  }
//console.log(data.questions);
//  console.log(typeof data.questions);
//  console.log('isnan', isNaN(data.questions))

  req.resources.nrOfQuestions = parseInt(data.questions);
//console.log(typeof req.resources.nrOfQuestions)
  //TODO trim each category
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

  query.category = {
    $in: categories
  }
  query.difficulty = difficultyLvl;

  //Question
  //.find(query)
  //.exec(function(err, results) {
  //  if (err) {
  //    console.log(err);
  //    return next(err);
  //  }
  //
  //  //console.log('res', results);
  //  req.resources.quizQuestions = results;
  //  next();
  //});

  //need a query that matches documents that have at least one
  //category from the categories array
  //and the given difficulty level
  //use match operator
  Question
  .search({
    query: {
      bool: {
        filter: [{
          terms: {
            category: categories
          }
        },{
          term: {difficulty: difficultyLvl}
        }]
      }
    }
  },
  { hydrate:true },
  function(err,results) {
    if (err) {
      return res.status(401).json({ message: err });
    }
    console.log(777, results.hits.hits);
    //res.json(results)

    req.resources.quizQuestions = results.hits.hits;
    next();
  });
}

function generateQuiz (req, res, next) {
  var nrOfQuestions = req.resources.nrOfQuestions;
  var questions = req.resources.quizQuestions;
  var finalQuestions = [];
  var chosenNr = [];
  req.session.historyData = {};

  if (nrOfQuestions > questions.length) {
    req.session.historyData.errorMessage = "There aren't enough questions matching your parameters";
    //res.json(req.session.historyData.errorMessage);
    nrOfQuestions = questions.length;
  }

  if (nrOfQuestions > 20) {
    req.session.historyData.errorMessage = "The number of questions  exceeds the maximum limit";
    nrOfQuestions = 20;
    //res.json(req.session.historyData.errorMessage);

  } else if (nrOfQuestions < 1) {
    req.session.historyData.errorMessage = "The number of questions  is unde the minimum limit";
    nrOfQuestions = 1;
    //res.json(req.session.historyData.errorMessage);
  }
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
  //console.log('!!!!!!!', finalQuestions)
  req.session.finalQuestions = finalQuestions;
  return res.redirect(304, '/quiz');
}

function takeQuizPage (req, res) {
  //console.log('finalQ', req.session.finalQuestions);
  res.render('quiz/take-quiz', {
    questions: req.session.finalQuestions,
    historyData: req.session.historyData
  })
}