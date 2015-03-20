(function() {

  angular.module('mainApp')
    .factory('vars', vars);

  function vars() {
    var V = {
      X: 100,
      Y: 100,
      vB: 2,
      vS: 2
    };

    return V;
  }

})();
