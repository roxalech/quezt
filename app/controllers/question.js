'use strict';

const _ = require('lodash');
const mongoose = require('mongoose');
const Question = mongoose.model('Question');

module.exports.addQuestionPage = addQuestionPage;
module.exports.addQuestion = addQuestion;
module.exports.searchQuestion = searchQuestion;

function addQuestionPage (req, res) {
  res.render('question/add-question', {
    session: req.session.historyData
  });
}

function addQuestion (req, res) {
  req.session.historyData = {};
  var data = _.pick(req.body, 'questionBody', 'answerType', 'difficulty', 'category');
  var answerArr = req.body.answers;

  var questionData = new Question({
    body: data.questionBody,
    answerType: data.answerType,
    difficulty: data.difficulty,
    category: data.category,
    author:  req.user._id
  });

  for (var i = 0; i < answerArr.length; i++) {
    var answerObj = {
      body: answerArr[i].body,
      index: i,
      correct: answerArr[i].correct
    }
    questionData.answers.push(answerObj);
  }

  //console.log(11111, questionData)

  questionData.save(function (err, result) {
    if(err) {
      return res.status(401).json({ message: err });
    }
    console.log('mongosave', result)
    questionData.on('es-indexed', function(err, res){
      if (err) throw err;
      /* Document is indexed */

      //console.log(222, res);
      //res.json(result);
    });
    req.session.historyData['successMessage'] = 'Your question was added';
    res.json(result);
  });
}

function searchQuestion(req, res, next) {
  Question.search(
    {query_string: {query: "g"}},
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