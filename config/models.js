'use strict';

module.exports.init = function(app) {
  var modelsPath = app.get('root') + '/app/models/';
  console.log(2334, modelsPath);
  ['user'].forEach(function(model) {
    require(modelsPath + model);
  });
};