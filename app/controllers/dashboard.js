'use strict';

module.exports.dashboard = dashboardPage;
module.exports.highscores = highscoresPage;

function dashboardPage (req, res) {
  res.render('common/dashboard', {
    quizzes: req.resources.quizzes
  });
}

function highscoresPage (req, res) {
  res.render('common/highscores');
}