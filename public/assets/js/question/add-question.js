(function(imports, exports, config, $) {
  'use strict';

  var baseUrl = config.baseUrl;

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

    $addQuestionForm.submit(function(e) {
      e.preventDefault();


    });
  }
})(APP, APP, CONFIG, $);