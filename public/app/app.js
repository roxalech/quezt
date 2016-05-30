/*	every angular module will be contained in a self executing anonymous function,
 so that when the index.html loads the scripts the code will start to run

 entry point of the entire application
 */

(function(){
  'use strict';

  //we register a module, the rest of the application will be hooked on this module
  // inside [] we inject dependencies (angular modules created by the dev or from angular)

  angular
    .module('app', [
      'ui.router',
      'auth'
    ]);

})();
