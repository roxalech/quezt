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
      var $topics = $searchForm.parent().find('.topics');
      console.log($topics);
      topicData['term'] = $topicInput.val();

      util
        .post(url, topicData)
        .done(function(result) {
          console.log(result);
          var arr = result.hits.hits;
          if (arr.length) {
            var template = ``;
            template += `<div>Searched results</div>`;
            for(var i=0; i<arr.length; i++) {
              if(arr[i]) {
                var url = baseUrl + '/topics/' + arr[i].hash;
                    template += `<div>
                    <a href=${url}>
                    ${arr[i].topic}
                  </a>
                </div>`;
              }

            }

            $(template).appendTo($topics);
          }
          //window.location.reload();
        })
        .fail(function(error) {
          //var message = JSON.parse(error.responseText);
          //util.generateNoty('error', message.message);
        });
    });
  }
})(APP, APP, CONFIG, $);