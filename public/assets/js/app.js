$(function() {
  'use strict';

  var APP = window['APP'] || {};
  var CONFIG = window['CONFIG'] || {};


  var routes = {
    'add.question' : new APP.AddQuestion({
      el: '.add-question'
    }),
    'edit.profile' : new APP.EditProfile({
      el: '#edit-profile-form'
    }),
    'add.topic' : new APP.AddTopic({
      el: '.add-forum-topic'
    }),
    'generate.quiz' : new APP.GenerateTest({
      el: '#quiz-form'
    }),
    'add.comment' : new APP.AddComment({
      el: '.comment-section'
    }),
    'take.quiz' : new APP.TakeQuiz({
      el: '.take-quiz'
    }),
    'search' : new APP.Search({
      el: '.search-topics'
    })
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