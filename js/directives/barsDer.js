(function() {
  angular.module('mainApp')
    .directive('barsDer', barsDer);

  function barsDer(sizeService) {
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

      scope.$on('windowResize', update);
      scope.$on('update', update);

      function update() {
        var data = vm.data;
        var w = x(data[0].dx) - x(0);
        var bars = sel.selectAll('.bar').data(data)

        bars.enter()
          .append('rect.bar')
          .attr("x", 1)

        bars.attr("transform", function(d) {
            return "translate(" + x(d.x) + "," + Math.min(y(d.y), vm.height) + ")";
          })
          .attr("width", w - 1)
          .attr("height", function(d) {
            return vm.height - y(d.y);
          });
      }

    }
  }

})();
