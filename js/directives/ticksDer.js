(function() {
  angular.module('mainApp').directive('ticksDer', ticksDer);

  function ticksDer() {
    var directive = {
      restrict: 'A',
      link: link,
      controller: angular.noop,
      bindToController: true,
      controllerAs: 'vm',
      scope: {
        data: '=',
        scales: '='
      }
    };
    return directive;

    function link(scope, el, attr, vm) {
      var tickSel = d3.select(el[0])
        .selectAll('marks')
        .data(vm.data)
        .enter()
        .append('circle.mark')
        .attr('r', 1.5);

      function update() {
        tickSel.data(vm.data)
          .translate(function(d) {
            return [vm.scales.x(d.x), vm.scales.y(d.y)];
          });
      }

      update();

      scope.$on('tickChange', update);
      scope.$watch('vm.scales.x.change + vm.scales.y.change', update);

    }
  }
})();
