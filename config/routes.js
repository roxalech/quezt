'use strict';

module.exports.init = function(app) {
  var routesPath = app.get('root') + '/app/routes';

  app.use('/', require(routesPath + '/authentication'));
  app.use('/', require(routesPath + '/dashboard'));
  app.use('/', require(routesPath + '/question'));
  app.use('/', require(routesPath + '/quiz'));
  app.use('/', require(routesPath + '/user'));
};