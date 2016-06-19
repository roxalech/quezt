'use strict';

const _ = require('lodash');
const mongoose = require('mongoose');
const Question = mongoose.model('Question');

module.exports.startQuiz = startQuizPage;
module.exports.generateQuiz = generateQuiz;

function startQuizPage (req, res) {
  res.render('quiz/start-quiz');
}

function generateQuiz (req, res, next) {
  var data = _.pick(req.body, 'category', 'difficulty', 'questions');

  console.log('quizDAta', data);

  Question
  .search({
    query_string: {
      query: {
        term: {
          category: "g"
        }
      }
    }
  },
  { hydrate:true },
  function(err,results) {
    if (err) {
      return res.status(401).json({ message: err });
    }
    console.log(2222, results.hits.hits);
    res.json(results)
    //next();
  });
}
