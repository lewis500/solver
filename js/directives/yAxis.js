(function() {
  angular.module('mainApp').directive('yAxis', YAxis);

  function YAxis() {
    var directive = {
      link: link,
      restrict: 'A',
      controller: angular.noop,
      bindToController: true,
      controllerAs: 'vm',
      scope: {
        width: '=w',
        scale: '=scale'
      }
    };

    return directive;

    function link(scope, el, attr, vm) {
      var axisFun = d3.svg.axis()
        .scale(vm.scale)
        .ticks(5)
        .orient("left");

      var sel = d3.select(el[0])

      // scope.$on('windowResize', fire);

      scope.$watch('vm.scale.change', fire);

      fire();

      function fire() {
        axisFun.tickSize(-vm.width);
        sel.call(axisFun);
      }
    }
  }

})();
