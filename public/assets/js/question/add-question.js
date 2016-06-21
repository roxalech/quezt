(function(imports, exports, config, $) {
  'use strict';

  var baseUrl = config.baseUrl;
  var util = imports.Util;

  exports['AddQuestion'] = AddQuestion;

  function AddQuestion(opts){
    this.el = opts.el;
    this.$el = $(opts.el);
    this.$addQuestionForm = this.$el.find('#question-form');
    this.$addAnswer = this.$el.find('.add-answer');
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
    var $addAnswer = self.$addAnswer;
    var $answerContainer = self.$answerContainer;
    var index = 1;
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

    $addAnswer.on('click', function (e) {
      e.preventDefault();
      var template = ``;
      var $index = 'answer-' + index;

      template = `<div class="form-group">
        <input
          type="text"
          class="answer form-control"
          id=${$index}
          name=${$index}
          placeholder="Answer *">
        </div> `;

      index++;
      $(template).appendTo($answerContainer);
    });

    $addQuestionForm.submit(function (e) {
      e.preventDefault();

      var url = baseUrl + '/add-question';
      var questionData = {};
      var $bodyInput = $('input[name="questionBody"]');
      var $difficultyInput = $('input[name="difficultyLvl"]');
      var $categoryInput = $('input[name="category"]');
      var $correctInput = $('input[name="correctAnswer"]');
      var $answerTypeInput = $('input[name="answerType"]');
      var $answers = $('.answer');
      console.log($answers.length);
      var answers = [];

      for (var i = 0; i < $answers.length; i++) {
        var inputName = '#answer-' + i;
        var answer = $(inputName).val();
        answers.push(answer);
      }

      questionData['questionBody'] = $bodyInput.val();
      questionData['answers'] = answers;
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