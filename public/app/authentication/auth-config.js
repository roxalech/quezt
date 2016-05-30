(function(){
  'use strict';

  angular
    .module('auth')
    .config(config);

  /*  $stateProvider comes with angular-ui-router
   with state we create new application states (urls, views, etc)
   * */
  function config($stateProvider){
    $stateProvider
      .state('auth', {
        url: '/signin',
        templateUrl: 'app/authentication/views/signin.html',
        authenticate: false
      });
  }
})();