(function() {
  angular.module('mainApp').directive('exAxis', XAxis);

  function XAxis() {
    var directive = {
      restrict: 'A',
      link: link,
      controller: angular.noop,
      bindToController: true,
      controllerAs: 'vm',
      scope: {
        height: '=h',
        scale: '=scale'
      }
    };

    return directive;

    function link(scope, el, attr, vm) {
      var axisFun = d3.svg.axis()
        .scale(vm.scale)
        .ticks(5)
        .tickSize(-vm.height)
        .orient("bottom");
      var sel = d3.select(el[0]).call(axisFun);
      scope.$watch('vm.scale.change', update);
      function update() {
        axisFun.tickSize(-vm.height);
        sel.call(axisFun);
      }

    };
  }
})();
