(function(imports, exports, config, $) {
  'use strict';

  var baseUrl = config.baseUrl;
  var util = imports.Util;

  exports['TakeQuiz'] = TakeQuiz;

  function TakeQuiz(opts){
    this.el = opts.el;
    this.$el = $(opts.el);
    this.time = this.$el.attr('data-time');
    this.date = this.$el.attr('data-date');
    this.$display = this.$el.find('#time');
    this.$submit = this.$el.find('.quiz-submit');
    this.$score = this.$el.find('.score');
    this.$saveScore = this.$el.find('#saveHighscore');
  }

  TakeQuiz.prototype.initialize = initialize;
  TakeQuiz.prototype.bindHandlers = bindHandlers;

  function initialize () {
    this.bindHandlers();
  }

  function bindHandlers () {
    var self = this;
    //var time = self.time;
    var $submit = self.$submit;
    var $score = self.$score;
    var $saveScore = self.$saveScore;

    //
    //$("html").on('mouseleave', function(e) {
    //  console.log(window.location.pathname);
    //  $submitModal.modal('show');
    //
    //  //alert('You are in quiz mode, you are not allowed to leave the page before submit');
    //})

    if($score.length) {
      setTimeout(showModal, 5000);
    }

    $saveScore.on('click', function(e) {
      var url = baseUrl + '/save-score';

      util
      .post(url)
      .done(function (result) {
        console.log(result);
        window.location.href = '/';
      })
      .fail(function (error) {
        console.log(error);
      })
    })

    //TODO on page reload calculate the time again
    //TODO show 00:00 when the result are being displayed
    //show a modal asking if user wants to keep score and add it to his total score
    //display the time left
    startTimer(self.time * 60, self.$display);

    $submit.on('click', function () {
      var $submitModal = $('#submit-quiz-modal');
      $submitModal.modal('show');

      var $submitQuiz = $submitModal.find('.submit');
      var $cancel = $submitModal.find('.cancel');

      $submitQuiz.on('click', function () {
        $submitModal.modal('hide');

        var url = baseUrl + '/quiz-answers';
        var data = {
          userAnswers: []
        };
        var $answers = self.$el.find('.answer');

        for(var i = 0; i < $answers.length; i++) {
          var answer = $answers.get(i);
          var $answer = $(answer);

          if ($answer.prop('checked')) {
            var $answerId = $answer.attr('data-id');

            data.userAnswers.push($answerId);

            //var questionDifficulty = $answer.attr('data-dif');
            //data.userAnswers.push({
            //  answer: $answerId,
            //  difficulty: questionDifficulty
            //});
          }
        }

        util
        .post(url, data)
        .done(function (result) {
          console.log(result);

          window.location.reload();
        })
        .fail(function (error) {
          console.log(error);
        })
        //console.log(userAnswers)
        //TODO get the answer the user has checked and send them to backend
        //create route for it
        //the response should show results and the score and the correct answers
        //ask user if he wants to keep score
        //if yes prompt the to rate the questions if they haven't already
        //add html for rating questions
        //get the ratings and send them to route
        //should I keep ratings?
      });

      $cancel.on('click', function () {
        $submitModal.modal('hide');
      })
    });
  } //end of bindHandlers

  function startTimer(duration, display) {
    var timer = duration, minutes, seconds;
    setInterval(function () {
      minutes = parseInt(timer / 60, 10)
      seconds = parseInt(timer % 60, 10);

      minutes = minutes < 10 ? "0" + minutes : minutes;
      seconds = seconds < 10 ? "0" + seconds : seconds;

      display.text(minutes + ":" + seconds);

      if (--timer < 0) {
        timer = duration;
      }
    }, 1000);
  }

  function showModal () {
    var $submitModal = $('#keep-score-modal');
    $submitModal.modal('show');

    var $submit = $submitModal.find('.submit');
    var $cancel = $submitModal.find('.cancel');

    $submit.on('click', function () {
      //TODO add quiz score to user score
    });

    $cancel.on('click', function () {
      $submitModal.modal('hide');
    })
  }

})(APP, APP, CONFIG, $);