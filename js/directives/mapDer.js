(function() {

  angular.module('mainApp')
    .controller('mapPlotCtrl', mapPlotCtrl)
    .directive('mapPlotDer', mapPlotDer);

  function mapPlotDer() {
    var directive = {
      controller: 'mapPlotCtrl',
      templateUrl: "templates/mapPlot.html",
      controllerAs: 'vm',
      bindToController: true,
      restrict: 'A',
      scope: {
        histUpdate: '='
      }
    };
    return directive;
  }

  function mapPlotCtrl($scope, $rootScope, tickService, dataService) {
    var vm = this;
    vm.scope = $scope;
    vm.scales = {
      x: d3.scale.linear().domain([0, 100]),
      y: d3.scale.linear().domain([0, 100])
    };

    vm.margin = {
      top: 25,
      left: 35,
      right: 25,
      bottom: 25
    };

    vm.tickService = tickService;
    vm.dataService = dataService;

    vm.C1 = {
      x: 30,
      y: 30
    };

    vm.C2 = {
      x: 50,
      y: 50
    };

    vm.update = update;

    function update() {
      tickService.update(vm.C1, vm.C2);
      dataService.update();
      $scope.$broadcast('tickChange');
      vm.histUpdate();
    };

    vm.dragDot = dragDot;

    function dragDot(dotDatum, newX, newY) {
      _.assign(dotDatum, {
        x: vm.scales.x.invert(newX),
        y: vm.scales.y.invert(newY)
      });
      vm.update();
    }

  }



})();
