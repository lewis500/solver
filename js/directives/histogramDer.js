(function() {

  angular.module('mainApp')
    .directive('histogramDer', histogramDer)
    .controller('histogramCtrl', histogramCtrl);

  function histogramDer() {
    var directive = {
      controller: 'histogramCtrl',
      templateUrl: 'templates/histogram.html',
      controllerAs: 'hist',
      restrict: 'A'
    };
    return directive;
  }

  function histogramCtrl($scope, dataService) {
    var vm = this;
    vm.scales = {
      x: d3.scale.linear(),
      y: d3.scale.linear()
    };
    vm.margin = {
      top: 25,
      left: 35,
      right: 25,
      bottom: 25
    };
    vm.data = [];
    vm.dataService = dataService;
    vm.update = _.throttle(update, 250);
    vm.histo = d3.layout.histogram()
      .value(function(d) {
        return d.res.Tp - d.res.T;
      });

    function update() {
      var xBounds = d3.extent(vm.dataService.ODs, function(d) {
        return d.res.Tp - d.res.T;
      });
      vm.scales.x.domain(xBounds);
      vm.histo.bins(vm.scales.x.ticks(20));
      vm.data = vm.histo(vm.dataService.ODs);
      var maxY = d3.max(vm.data, function(d) {
        return d.y;
      });
      vm.scales.y.domain([0, maxY]);
      // $scope.$apply();
      $scope.$broadcast('windowResize', vm.data);
    }

  }



})();
