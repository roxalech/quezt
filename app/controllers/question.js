'use strict';

const _ = require('lodash');
const mongoose = require('mongoose');
const Question = mongoose.model('Question');
const Answer = mongoose.model('Answer');

module.exports.addQuestionPage = addQuestionPage;
module.exports.addQuestion = addQuestion;
module.exports.searchQuestion = searchQuestion;
module.exports.saveJSON = saveJSON;
module.exports.verifyMatches = verifyQuestionMatches;
module.exports.suggestCategories = suggestCategories;
module.exports.getUserQuestions = getUserQuestions;

function addQuestionPage (req, res) {
  res.render('question/add-question', {
    session: req.session.historyData
  });
}

function saveJSON (req, res) {
  var questionData = {
    question: req.resources.question,
    answers: req.resources.answers
  }
  res.json(questionData);
}

function addQuestion (req, res, next) {
  req.session.historyData = {};
  var data = _.pick(req.body, 'questionBody', 'answerType', 'difficulty', 'category');

  var categ = data.category.split(' ');
  var questionData = new Question({
    content: data.questionBody,
    answersType: data.answerType,
    difficultyLvl: data.difficulty,
    categories: data.category,
    categories_suggest: data.category,
    author:  req.user._id
  });

  questionData.save(function (err, result) {
    if(err) {
      return res.status(401).json({ message: err });
    }

    //console.log('mongosave', result)
    questionData.on('es-indexed', function(err, res){
      if (err) throw err;
      /* Document is indexed */
      console.log('in es_indexed', res);
    });
    req.session.historyData['successMessage'] = 'Your question was added';
    req.resources.question = result;
    next();
  });
}

function searchQuestion(req, res, next) {
  Question
  .search({
    query_string: {query: "g"}
  },{ 
    hydrate:true 
  },
  function(err,results) {
    if (err) {
      return res.status(401).json({ message: err });
    }
    console.log(2222, results.hits.hits);
    res.json(results)
    //next();
  });
}

function verifyQuestionMatches (req, res, next) {
  var questionContent = req.body.content;

  //console.log('content from ui', questionContent);

  Question
  .search({
    query: {
      match: {
        content: questionContent
      }
    }
  },{ 
    hydrate:true 
  }, function(err,results) {
    if (err) {
      return res.status(401).json({ message: err });
    }
    console.log('QUERY RESULTS', results.hits.hits);
    res.json(results);
  });
}

function suggestCategories (req, res, next) {
  var categoryCrumb = req.body.category;
  //console.log('ui cateogry', categoryCrumb);

  Question
    .search({
      "query": {
        "match_all": {}
      },
      "suggest": {
        "questions": {
          "text": categoryCrumb,
          "completion": {
            "field": "categories_suggest"
          }
        }
      }
    },function(err,results) {
      if (err) {
        console.log(err);
        return res.status(401).json({ message: err });
      }
      //console.log('QUERY RESULTS', results.hits.hits);
      res.json(results);
    });
}


function getUserQuestions(req, res, next) {
  Question
  .find({author: req.user._id}, function(err, result) {
    if(err) {
      console.log('GET getUserQuestions - question ctrl err', err);
    }

    //console.log('!!!!!',result);
    req.resources.questions = result;
    next()
  });
}