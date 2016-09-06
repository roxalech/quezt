(function(imports, exports, config, $) {
  'use strict';

  var baseUrl = config.baseUrl;
  var util = imports.Util;

  exports['Search'] = Search;

  function Search(opts){
    this.el = opts.el;
    this.$el = $(opts.el);
    this.$searchForm = this.$el.find('.search-form');
  }

  Search.prototype.initialize = initialize;
  Search.prototype.bindHandlers = bindHandlers;

  function initialize () {
    this.bindHandlers();
  }

  function bindHandlers () {
    var self = this;
    var $searchForm = self.$searchForm;

    $searchForm.submit(function(e) {
      e.preventDefault();
      var url = baseUrl + '/search-forum';
      var topicData = {};
      var $topicInput = $('input[name="search-term"]');

      topicData['term'] = $topicInput.val();

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