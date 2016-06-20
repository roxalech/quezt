(function(imports, exports, config, $) {
  'use strict';

  var baseUrl = config.baseUrl;
  var util = imports.Util;

  exports['AddQuestion'] = AddQuestion;

  function AddQuestion(opts){
    this.el = opts.el;
    this.$el = $(opts.el);
    this.$addQuestionForm = this.$el.find('#question-form');
    this.$answer = this.$el.find('.answer');
    this.$answerContainer = this.$el.find('.answer-container');
  }

  AddQuestion.prototype.initialize = initialize;
  AddQuestion.prototype.bindHandlers = bindHandlers;

  function initialize () {
    this.bindHandlers();
  }

  function bindHandlers () {
    var self = this;
    var $addQuestionForm = self.$addQuestionForm;
    var $answer = self.$answer;
    var $answerContainer = self.$answerContainer;

    //var test = baseUrl + '/search-question';
    //console.log(test)
    //util
    //  .get(test)
    //  .done(function(result) {
    //    console.log(result);
    //    //window.location.reload();
    //  })
    //  .fail(function(error) {
    //    console.log(error);
    //    //var message = JSON.parse(error.responseText);
    //    //util.generateNoty('error', message.message);
    //  });

    $answer.on('click', function () {
      var template = ``;

      template = `<input  type="text"
        class="answer form-control"
         name="answer"
         placeholder="Answer *"> `;

      $(template).appendTo($answerContainer);
    });

    $addQuestionForm.submit(function (e) {
      e.preventDefault();

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