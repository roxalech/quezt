(function(imports, exports, config, $) {
  'use strict';

  var baseUrl = config.baseUrl;
  var util = imports.Util;

  exports['EditProfile'] = EditProfile;

  function EditProfile(opts){
    this.el = opts.el;
    this.$el = $(opts.el);
  }

  EditProfile.prototype.initialize = initialize;
  EditProfile.prototype.bindHandlers = bindHandlers;

  function initialize () {
    this.bindHandlers();
  }

  function bindHandlers () {
    this.$el.on('click', '.btn-submit', editProfile);
  }

  function editProfile(e) {
    e.preventDefault();
    var url = baseUrl + '/account';

    var userCredentials = {};
    var $nameInput = $('input[name="name"]');
    var $usernameInput = $('input[name="username"]');
    var $emailInput = $('input[name="email"]');

    userCredentials['name'] = $nameInput.val();
    userCredentials['username'] = $usernameInput.val();
    userCredentials['email'] = $emailInput.val();

    util
      .put(url, userCredentials)
      .done(function(result) {
        //console.log(result);
        window.location.reload();
      })
      .fail(function(error) {
        //var message = JSON.parse(error.responseText);
        //util.generateNoty('error', message.message);
      });
  }
})(APP, APP, CONFIG, $);