(function(imports, exports, config, $) {
  'use strict';

  var baseUrl = config.baseUrl;
  var util = imports.Util;

  exports['AddComment'] = AddComment;

  function AddComment(opts){
    this.el = opts.el;
    this.$el = $(opts.el);
    this.$addTopicForm = this.$el.find('#comment-form');
  }

  AddComment.prototype.initialize = initialize;
  AddComment.prototype.bindHandlers = bindHandlers;

  function initialize () {
    this.bindHandlers();
  }

  function bindHandlers () {
    var self = this;
    var $addTopicForm = self.$addTopicForm;

    $addTopicForm.submit(function(e) {
      e.preventDefault();

      var hash = $(this).attr('data-hash');
      console.log(hash);
      var url = baseUrl + '/topic/' + hash +'/comment';
      var commentData = {};
      var $topicInput = $('input[name="add-comment"]');

      commentData['body'] = $topicInput.val();

      util
        .post(url, commentData)
        .done(function(result) {
          //console.log(result);
          window.location.reload();
        })
        .fail(function(error) {
          //var message = JSON.parse(error.responseText);
          //util.generateNoty('error', message.message);
        });
    });
  }
})(APP, APP, CONFIG, $);