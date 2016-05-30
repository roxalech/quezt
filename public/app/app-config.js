(function(){
  'use strict';

  angular
    .module('app')
    .config(config)
    .run(run);

  config.$inject = ['$urlRouterProvider'];
  function config ($urlRouterProvider) {

    $urlRouterProvider.otherwise('/signin');
  }

  function run(){

    console.log('running');

  }

})();