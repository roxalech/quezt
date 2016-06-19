'use strict';

module.exports.dashboard = dashboardPage;
module.exports.highscores = highscoresPage;

function dashboardPage (req, res) {
  res.render('common/dashboard');
}

function highscoresPage (req, res) {
  res.render('common/highscores');
}