(function(imports, exports, config, $) {
  'use strict';

  var baseUrl = config.baseUrl;
  var util = imports.Util;

  exports['AddQuestion'] = AddQuestion;

  function AddQuestion(opts){
    this.el = opts.el;
    this.$el = $(opts.el);
    this.$addQuestionForm = this.$el.find('#question-form');
    this.$addAnswer = this.$el.find('.add-answer');
    this.$answerContainer = this.$el.find('.answer-container');
    this.$success = this.$addQuestionForm.find('.success');
  }

  AddQuestion.prototype.initialize = initialize;
  AddQuestion.prototype.bindHandlers = bindHandlers;
  //AddQuestion.prototype.checkForCorrect = checkForCorrect;

  function initialize () {
    this.bindHandlers();
  }



  function bindHandlers () {
    var self = this;
    var $addQuestionForm = self.$addQuestionForm;
    var $addAnswer = self.$addAnswer;
    var $answerContainer = self.$answerContainer;
    var index = 0;
    var $type = $addQuestionForm.find('#type');
    var $warning = $addQuestionForm.find('.warning');
    //var $success = this.$success;

    $type.on('keyup', function () {
      if($(this).val()) {
        $warning.addClass('hide');
        //$success.addClass('hide');
      }
    });

    $addAnswer.on('click', function (e) {
      e.preventDefault();
      var answerType = $type.val();
      answerType ? $type.attr('readonly', true) : $type.attr('readonly', false);

      var template = ``;
      var $index = 'answer-' + index;
      var inputType;

      if (!answerType) {
        $type.attr('readonly', false)
        $warning.removeClass('hide');
        $warning.text('You must introduce the answer type first');

      }  else {
        //TODO make a call to see the mathes of the type values with the existent synonyms
        //make answerType input readonly if a value has been introduced
        $type.attr('readonly', true);
        $warning.addClass('hide');
        answerType == 'single' ? inputType = 'radio' : inputType = 'checkbox';

        template = `<div class="answer-item form-group">
          <input
            type="text"
            class="answer form-control"
            id=${$index}
            name=${$index}
            placeholder="Answer *">
          <input
            type=${inputType}
            class="correct form-control"
            name='correct'>
          <button
            id=${$index}
            class="delete btn btn-danger">
            x
          </button>
        </div> `;

        index++;
        $(template).appendTo($answerContainer);
      }

      var $delete = $addQuestionForm.find('.delete');
      $delete.on('click', function () {
        $(this).parent().remove();
        var $items = $addQuestionForm.find('.answer-item');
        if (!$items.length) {
          $type.attr('readonly', false);
        }
      });
      //self.checkForCorrect();
    });

    $addQuestionForm.submit(function (e) {
      e.preventDefault();
      var $this = $(this);
      var url = baseUrl + '/add-question';
      var questionData = {};
      var checkForVals = false;

      var $answers = $this.find('.answer');
      var answersObj = prepareAnswers($answers);
      questionData['questionBody'] =  $('input[name="questionBody"]').val();
      questionData['answers'] = answersObj.answers;
      questionData['difficulty'] = $('input[name="difficultyLvl"]').val();
      questionData['category'] = $('input[name="category"]').val();
      questionData['answerType'] = $('input[name="answerType"]').val();

      if (!answersObj.checkCorrect) {
        $warning.removeClass('hide');
        $warning.text('You must select the correct answer and complete all fields');

      } else {
        //check if all fields have been completed
        for (var key in questionData) {
          if (questionData.hasOwnProperty(key)) {
            if(!questionData[key]) {
              checkForVals = true;
            }
          }
        }

        if(checkForVals) {
          $warning.removeClass('hide');
          $warning.text('You must complete all fields');
        } else {
          util
          .post(url, questionData)
          .done(function(result) {
            console.log(result);
            //add noty
            window.location.reload();
          })
          .fail(function(error) {
            console.log(error);
            //var message = JSON.parse(error.responseText);
            //util.generateNoty('error', message.message);
          });
        }
      }
    });

    function hideSuccess () {
      var $success = self.$success;
      $success.addClass('hide');
    }

    setTimeout(hideSuccess, 5000);
  } //end of Bindhandlers

  function prepareAnswers ($answers) {
    var isCorrect;
    var returnObj = {
      answers: [],
      checkCorrect: false
    };

    for (var i = 0; i < $answers.length; i++) {
      var inputName = '#answer-' + i;
      var $input = $(inputName);
      var answerVal = $input.val();

      if (answerVal) {
        var $isCorrect = $input.next();

        if($isCorrect.prop('checked')) {
          isCorrect = true;
          returnObj.checkCorrect = true;
        } else {
          isCorrect = false;
        }
        var answer = {
          body: answerVal,
          correct: isCorrect
        };
        returnObj.answers.push(answer);
      }
    }

    return returnObj;
  }

  //function checkForCorrect () {
  //  var $addQuestionForm = this.$addQuestionForm;
  //  var $submit = $addQuestionForm.find('.submit-btn');
  //  var $correct = $addQuestionForm.find('.correct');
  //
  //  $correct.on('click', function () {
  //    var $this = $(this);
  //    var verifyOtherChecks = false;
  //
  //    if($this.prop('checked')) {
  //      $submit.prop('disabled', false);
  //    } else {
  //      for (var i = 0; i < $correct.length; i++) {
  //        var $item = $correct.get(i);
  //
  //        if ($($item).prop('checked')) {
  //          verifyOtherChecks = true
  //        }
  //      }
  //      if (!verifyOtherChecks) {
  //        $submit.prop('disabled', true);
  //      } else {
  //        $submit.prop('disabled', false);
  //      }
  //    }
  //  })
  //}
})(APP, APP, CONFIG, $);