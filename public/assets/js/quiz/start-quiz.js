(function(imports, exports, config, $) {
  'use strict';

  var baseUrl = config.baseUrl;
  var util = imports.Util;

  exports['GenerateTest'] = GenerateTest;

  function GenerateTest(opts){
    this.el = opts.el;
    this.$el = $(opts.el);
  }

  GenerateTest.prototype.initialize = initialize;
  GenerateTest.prototype.bindHandlers = bindHandlers;

  function initialize () {
    this.bindHandlers();
  }

  function bindHandlers () {
    this.$el.submit(function(e) {
      e.preventDefault();

      var url = baseUrl + '/start-quiz';
      var quizData = {};
      var $categoryInput = $('input[name="category"]');
      var $difficultyInput = $('input[name="difficulty"]');
      var $questionsInput = $('input[name="questions"]');

      quizData['category'] = $categoryInput.val();
      quizData['difficulty'] = $difficultyInput.val();
      quizData['questions'] = $questionsInput.val();

      util
        .post(url, quizData)
        .done(function(result) {
          console.log(result);
          //window.location.reload();
          window.location.href = '/quiz'
        })
        .fail(function(error) {
            console.log(JSON.parse(error.responseText))
          //var message = JSON.parse(error.responseText);
          //util.generateNoty('error', message.message);
        });
    });
  }
})(APP, APP, CONFIG, $);