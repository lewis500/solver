(function() {

  angular.module('mainApp').factory('vars', vars);

  function vars() {
    var V = {
      xMax: 100,
      yMax: 100,
      vB: 2,
      vS: 2
    };

    return V;
  }

})();
