(function(imports, exports, config, $) {
  'use strict';

  var baseUrl = config.baseUrl;
  var util = imports.Util;

  exports['AddQuestion'] = AddQuestion;

  function AddQuestion(opts){
    this.el = opts.el;
    this.$el = $(opts.el);
    this.$addQuestionForm = this.$el.find('#question-form');
  }

  AddQuestion.prototype.initialize = initialize;
  AddQuestion.prototype.bindHandlers = bindHandlers;

  function initialize () {
    this.bindHandlers();
  }

  function bindHandlers () {
    var self = this;
    var $addQuestionForm = self.$addQuestionForm;

    var test = baseUrl + '/search-question';
    console.log(test)
    util
      .get(test)
      .done(function(result) {
        console.log(result);
        //window.location.reload();
      })
      .fail(function(error) {
        console.log(error);
        //var message = JSON.parse(error.responseText);
        //util.generateNoty('error', message.message);
      });

    $addQuestionForm.submit(function(e) {
      e.preventDefault();
console.log('in');
      var url = baseUrl + '/add-question';
      var questionData = {};
      var $bodyInput = $('input[name="questionBody"]');
      var $answerInput = $('input[name="answer"]');
      var $difficultyInput = $('input[name="difficultyLvl"]');
      var $categoryInput = $('input[name="category"]');
      var $correctInput = $('input[name="correctAnswer"]');
      var $answerTypeInput = $('input[name="answerType"]');

      questionData['questionBody'] = $bodyInput.val();
      questionData['answer'] = $answerInput.val();
      questionData['difficulty'] = $difficultyInput.val();
      questionData['category'] = $categoryInput.val();
      questionData['correctAnswer'] = $correctInput.val();
      questionData['answerType'] = $answerTypeInput.val();

      util
        .post(url, questionData)
        .done(function(result) {
          console.log(result);
          //window.location.reload();
        })
        .fail(function(error) {
          console.log(error);
          //var message = JSON.parse(error.responseText);
          //util.generateNoty('error', message.message);
        });
    });
  }
})(APP, APP, CONFIG, $);