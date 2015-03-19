(function() {

  angular.module('mainApp')
    .controller('mapPlotCtrl', mapPlotCtrl)
    .directive('mapPlotDer', mapPlotDer);

  function mapPlotDer() {
    var directive = {
      controller: 'mapPlotCtrl',
      templateUrl: "templates/map.html",
      controllerAs: 'vm',
      bindToController: true,
      restrict: 'A',
      scope: {
        histUpdate: '='
      }
    };
    return directive;
  }

  function mapPlotCtrl($scope, $rootScope, tickService, dataService, vars) {
    var vm = this;
    vm.scope = $scope;
    vm.scales = {
      x: d3.scale.linear().domain([0, 100]),
      y: d3.scale.linear().domain([0, 100])
    };
    vm.scales.x.change = 0;
    vm.scales.y.change = 0;

    vm.margin = {
      top: 25,
      left: 35,
      right: 25,
      bottom: 25
    };

    vm.tickService = tickService;
    vm.dataService = dataService;
    vm.vars = vars;

    vm.C1 = {
      x: 30,
      y: 30
    };

    vm.C2 = {
      x: 50,
      y: 50
    };
    vm.dragDot = dragDot;
    vm.update = update;

    $scope.$watch('vm.vars.vB + vm.vars.vS', function() {
      vm.update();
    });

    function update() {
      tickService.update(vm.C1, vm.C2);
      dataService.update();
      $scope.$broadcast('tickChange');
      vm.histUpdate();
    }

    function dragDot(dotDatum, newX, newY) {
      _.assign(dotDatum, {
        x: vm.scales.x.invert(newX),
        y: vm.scales.y.invert(newY)
      });
      vm.update();
    }

  }



})();
