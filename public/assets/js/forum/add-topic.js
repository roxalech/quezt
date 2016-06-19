(function(imports, exports, config, $) {
  'use strict';

  var baseUrl = config.baseUrl;

  exports['AddTopic'] = AddTopic;

  function AddTopic(opts){
    this.el = opts.el;
    this.$el = $(opts.el);
    this.$addTopicForm = this.$el.find('#topic-form');
  }

  AddTopic.prototype.initialize = initialize;
  AddTopic.prototype.bindHandlers = bindHandlers;

  function initialize () {
    this.bindHandlers();
  }

  function bindHandlers () {
    var self = this;
    var $addTopicForm = self.$addTopicForm;

    $addTopicForm.submit(function(e) {
      e.preventDefault();
      var url = baseUrl + '/add-topic';
      var topicData = {};
      var $topicInput = $('input[name="add-forum-topic"]');
      var $categoryInput = $('input[name="category"]');

      topicData['topic'] = $topicInput.val();
      topicData['category'] = $categoryInput.val();

      util
        .post(url, topicData)
        .done(function(result) {
          console.log(result);
          //window.location.reload();
        })
        .fail(function(error) {
          //var message = JSON.parse(error.responseText);
          //util.generateNoty('error', message.message);
        });
    });
  }
})(APP, APP, CONFIG, $);