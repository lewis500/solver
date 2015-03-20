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
    vm.scales = {
      x: d3.scale.linear().domain([0, vars.X]),
      y: d3.scale.linear().domain([0, vars.Y])
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
    vm.download = download;
    vm.fileName = 'Barcelona.csv'

    function download() {
      var toParse = dataService.ODs.map(function(d, i) {
        var r = d.res;
        return {
          k: i,
          x0: d.O.x,
          y0: d.O.y,
          x1: d.D.x,
          y1: d.D.y,
          T: r.T,
          Tp: r.Tp,
          deltaT: r.T - r.Tp
        };
      });
      var parsed = d3.csv.format(toParse);
      var parsed2 = d3.csv.format([{
        X: vars.X,
        Y: vars.Y,
        x0: vm.C1.x,
        y0: vm.C1.y,
        x1: vm.C2.x,
        y1: vm.C2.y
      }]);
      var toPrint = [parsed2, parsed].join('\n')
      var contentType = 'text/csv';
      var csvFile = new Blob([toPrint], {
        type: contentType
      });

      var a = document.createElement('a');
      a.download = vm.fileName;
      a.href = window.URL.createObjectURL(csvFile);
      a.textContent = 'Download CSV';
      a.dataset.downloadurl = [contentType, a.download, a.href].join(':');
      document.body.appendChild(a);
      a.click();
    }

    $scope.$watch('vm.vars', function(newVal, oldVal) {
      $scope.$evalAsync(function() {
        if ((newVal.X + newVal.Y) !== (oldVal.X + oldVal.Y)) {
          dataService.updateArray();
        }
        vm.update();
      });
    }, true);

    function update() {
      vm.scales.x.domain([0, vars.X]);
      vm.scales.y.domain([0, vars.Y]);
      vm.scales.x.change++;
      vm.scales.y.change++;
      tickService.update(vm.C1, vm.C2);
      dataService.update();
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
