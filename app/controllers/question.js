'use strict';

const _ = require('lodash');
const mongoose = require('mongoose');
const Question = mongoose.model('Question');

module.exports.addQuestionPage = addQuestionPage;
module.exports.addQuestion = addQuestion;
module.exports.searchQuestion = searchQuestion;

function addQuestionPage (req, res) {
  res.render('question/add-question');
}

function addQuestion (req, res) {
  var data = _.pick(req.body, 'body', 'answer', 'topic', 'correctAnswer', 'difficultyLvl');
console.log(data);

  var questionData = new Question({
    body: data.body,
    answer: data.answer,
    topic: data.topic,
    correctAnswer: data.correctAnswer,
    difficultyLvl: data.difficultyLvl,
    author: '57606401bdc0583822bc637e'
  });

  questionData.save(function (err, result) {
    if(err) {
      console.log(err);
    }
    questionData.on('es-indexed', function(err, res){
      if (err) throw err;
      /* Document is indexed */

      console.log(111, result);

    });
    res.json(result);
  });
}

function searchQuestion(req, res, next) {
  Question.search(
    {query_string: {query: "bob"}},
    { hydrate:true },
    function(err,results) {
      console.log(2222, results.hits.hits);
      next();
    });
  }