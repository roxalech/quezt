'use strict';

module.exports.dashboard = startQuizPage;

function startQuizPage (req, res) {
  res.render('quiz/start-quiz');
}