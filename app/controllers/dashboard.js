'use strict';

module.exports.dashboard = dashboardPage;
module.exports.highscores = highscoresPage;

function dashboardPage (req, res) {
  res.render('common/dashboard', {
    score: req.resources.score
  });
}

function highscoresPage (req, res) {
  res.render('common/highscores', {
    statistics: req.resources.statistics
  });
}