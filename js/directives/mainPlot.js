(function(angular) {
  angular.module('mainApp')
    .directive('mainPlot', mainPlot)
    .factory('sizeService', sizeService)
    .controller('mainPlotCtrl', mainPlotCtrl);

  function sizeService() {
    var S = {
      svgWidth: 0,
      svgHeight: 0,
      width: 0,
      height: 0,
      xScale: d3.scale.linear().domain([0, 100]),
      yScale: d3.scale.linear().domain([0, 100]),
      resize: resize
    };

    S.M = {
      top: 25,
      left: 35,
      right: 25,
      bottom: 25
    };

    S.aspectRatio = 0.4;

    function resize(svgWidth) {
      S.svgWidth = svgWidth;
      S.svgHeight = S.svgWidth * S.aspectRatio;
      S.width = S.svgWidth - S.M.left - S.M.right
      S.height = S.svgHeight - S.M.top - S.M.bottom;
      S.xScale.range([0, S.width]);
      S.yScale.range([S.height, 0]);
    }

    return S;
  }

  function mainPlotCtrl($scope, $element, $window, sizeService, tickService, dataService, vars) {
      var vm = this;
      var par = $element.parent()[0];
      vm.helloData = [];
      $scope.SS = sizeService;
      $scope.TS = tickService;
      $scope.DS = dataService;
      var histo = d3.layout.histogram()
        .value(function(d) {
          return d.res.Tp - d.res.T;
        }).frequency(false);

      $scope.$watch(function(d) {
        return vars.vB + vars.vS;
      }, function() {
        vm.calc();
      });

      vm.calc = _.throttle(function() {
        dataService.calc();
        vm.scales2.x
          .domain(d3.extent(dataService.ODs, function(d) {
            return d.res.Tp - d.res.T;
          }));
        histo.bins(vm.scales2.x.ticks(20));
        var data = histo(dataService.ODs);
        vm.scales2.y
          .domain([0, d3.max(data, function(d) {
            return d.y;
          })]);
        vm.helloData = data;
        $scope.$broadcast('recalc');
        $scope.$broadcast('windowResize');
      }, 500);
      vm.scales = {
        x: sizeService.xScale,
        y: sizeService.yScale
      };
      vm.scales2 = {
        y: d3.scale.linear().domain([0, .2]),
        x: d3.scale.linear()
      };
      vm.C1 = {
        x: 30,
        y: 30
      };
      vm.C2 = {
        x: 50,
        y: 50
      };
      vm.dragDot = dragDot;
      $window.onresize = resize;
      resize();
      updateTicks();

      function dragDot(dotDatum, newX, newY) {
        _.assign(dotDatum, {
          x: vm.scales.x.invert(newX),
          y: vm.scales.y.invert(newY)
        });
        updateTicks();
      }

      function updateTicks() {
        tickService.updateTicks(vm.C1, vm.C2);
        $scope.$broadcast('tickChange');
        vm.calc();
      }

      function resize() {
        sizeService.resize(par.clientWidth);
        vm.scales2.y.range([sizeService.height, 0]);
        vm.scales2.x.range([0, sizeService.width]);
        if (!$scope.$$phase) $scope.$apply();
        $scope.$broadcast('windowResize');
      }
    } //end controller

  function mainPlot() {
    var directive = {
      controller: 'mainPlotCtrl',
      templateNamespace: 'svg',
      templateUrl: 'plot.html',
      controllerAs: 'vm',
      link: function(scope, el, attr) {
        scope.template = attr.template;
        scope.template2 = attr.template2;
      }
    };

    return directive;
  }

})(angular);
