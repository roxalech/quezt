'use strict';

module.exports.init = function(app) {
  var modelsPath = app.get('root') + '/app/models/';

  [ 'user',
    'user-statistics',
    'question',
    'forum',
    'comment'].forEach(function(model) {
    require(modelsPath + model);
  });
};