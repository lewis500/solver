(function() {
  angular.module('mainApp')
    .directive('inputsDer', inputDer)
    .controller('inputCtrl', inputCtrl)

  function inputCtrl($scope, vars) {
    var vm = this;
    $scope.vars = vars;
  }


  function inputDer() {
    var directive = {
      controller: 'inputCtrl',
      controllerAs: 'vm',
      restrict: 'A',
      templateUrl: 'inputs.html'
    };
    return directive;
  }


})();
