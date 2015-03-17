(function() {

  angular.module('mainApp')
    .directive('tableDer', tableDer)
    .controller('tableCtrl', tableCtrl);

  function tableCtrl(dataService) {
    var vm = this;
    vm.array = dataService.array;
  }

  function tableDer() {
    var directive = {
      restrict: 'A',
      templateUrl: 'templates/table.html',
      controller: 'tableCtrl',
      controllerAs: 'vm'
    };

    return directive;

  }

})();
