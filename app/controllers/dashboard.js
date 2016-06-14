'use strict';

module.exports.dashboard = dashboardPage;

function dashboardPage (req, res) {
  res.render('common/dashboard');
}