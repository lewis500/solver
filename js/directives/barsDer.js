(function() {
  angular.module('mainApp').directive('barsDer', barsDer);

  function barsDer() {
    var directive = {
      link: link,
      controller: angular.noop,
      bindToController: true,
      controllerAs: 'vm',
      scope: {
        scales: '=',
        data: '=',
      }
    };
    return directive;

    function link(scope, el, attr, vm) {
      var sel = d3.select(el[0]);
      var x = vm.scales.x;
      var y = vm.scales.y;
      scope.$on('windowResize', update);
      // scope.$watch('vm.data[0].y', update);

      function update() {
        var data = vm.data;
        if (!data.length > 0) return;
        var bars = sel.selectAll('.bar')
          .data(vm.data);

        bars.enter()
          .append('rect.bar')
          .attr("x", 1);

        var w = x(data[0].dx) - x(0);
        var height = y.range()[0];

        bars.attr({
          transform: function(d) {
            return "translate(" + x(d.x) + "," + y(d.y) + ")";
          },
          width: w - 1,
          height: function(d) {
            return height - y(d.y);
          }
        });
      }

    }
  }

})();
