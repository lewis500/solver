(function() {
  angular.module('mainApp').directive('yAxis', YAxis);

  function YAxis() {
    var directive = {
      link: link,
      restrict: 'A',
      scope: {
        width: '=w',
        scale: '=scale'
      }
    };

    return directive;

    function link(scope, el, attr) {
      var axisFun = d3.svg.axis()
        .scale(scope.scale)
        .ticks(5)
        .orient("left");
      var sel = d3.select(el[0]).call(axisFun);
      scope.$on('windowResize', fire);
      fire();

      function fire() {
        axisFun.tickSize(-scope.width);
        sel.call(axisFun);
      }
    }
  }

})();
