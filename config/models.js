'use strict';

module.exports.init = function(app) {
  var modelsPath = app.get('root') + '/app/models/';

  ['user', 'results'].forEach(function(model) {
    require(modelsPath + model);
  });
};