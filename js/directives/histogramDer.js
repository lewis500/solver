(function() {

  angular.module('mainApp')
    .directive('histogramDer', histogramDer)

  function histogramDer(sizeService) {
    var directive = {
      link: link,
      controller: angular.noop,
      bindToController: true,
      controllerAs: 'vm',
      scope: {
        scales: '=',
        data: '=',
        height: '='
      }
    };
    return directive;

    function link(scope, el, attr, vm) {

      var sel = d3.select(el[0]);
      var bars;
      var x = vm.scales.x;
      var y = vm.scales.y;
      start();

      scope.$on('windowResize', update);
      // scope.$on('recalc', update);
      // $scope.$broadcast('tickChange');

      function start() {
        // histo.bins(vm.scales.x.ticks(20));
        bars = sel.selectAll('.bar')
          .data(d3.range(20))
          .enter().append('rect.bar')
          .attr("x", 1)

      }

      function update() {
        var data = vm.data;
        bars.data(data)
          .attr("transform", function(d) {
            return "translate(" + x(d.x) + "," + y(d.y) + ")";
          })
          .attr("width", x(data[0].dx) - 1)
          .attr("height", function(d) {
            return vm.height - y(d.y);
          });
      }

    }
  }



})();
