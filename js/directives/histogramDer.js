(function() {

  angular.module('mainApp')
    .directive('histogramDer', histogramDer)
    .controller('histogramCtrl', histogramCtrl);

  function histogramCtrl($scope, $rootScope, dataService) {
    var vm = this;
    vm.scales = {
      x: d3.scale.linear(),
      y: d3.scale.linear()
    };
    vm.data = [];
    vm.margin = {
      top: 25,
      left: 35,
      right: 25,
      bottom: 25
    };
    vm.dataService = dataService;
    $rootScope.$on('udpate', vm.update);
  }

  _.assign(histogramCtrl.prototype, {
    update: function() {
      this.histo.bins(this.scales.x.ticks(20));
      this.data = this.histo(this.dataService.ODs);
      var maxY = d3.max(this.data, function(d) {
        return d.y;
      });
      this.scales.y.domain([0, maxY]);
      var xBounds = d3.extent(this.data, function(d) {
        return d.x;
      });
      this.scales.x.domain(xBounds);
      this.scope.$broadcast('update');
    },
    histo: d3.layout.histogram().value(function(d) {
      return d.res.Tp - d.res.T;
    })

  });

  function histogramDer() {
    var directive = {
      controller: 'histogramCtrl',
      templateUrl: 'templates/histogram.html',
      controllerAs: 'vm',
      restrict: 'A'
    };

    return directive;

  }

})();
