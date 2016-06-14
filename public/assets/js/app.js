$(function() {
  'use strict';

  var APP = window['APP'] || {};
  var CONFIG = window['CONFIG'] || {};


  var routes = {
    
  };

  bootstrap();

  function bootstrap() {
    var $modules = $('[data-module]');

    $modules.each(function(index, module) {
      var $module = $modules.eq(index);
      var route = $module.data('module');
      var routeArr = route.split(';');

      for(var i in routeArr){
        exec(routes[routeArr[i]]);
      }
    });
  }

  function exec(instance) {
    instance.initialize();
  }
});