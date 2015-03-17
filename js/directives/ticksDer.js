(function() {
  angular.module('mainApp').directive('ticksDer', ticksDer);

  function ticksDer() {
    var directive = {
      restrict: 'A',
      link: link,
      scope: {
        data: '=',
        scales: '='
      }
    };
    return directive;

    function link(scope, el, attr) {
      var tickSel = d3.select(el[0]).selectAll('marks')
        .data(scope.data)
        .enter()
        .append('circle.mark')
        .attr('r', 1.5);

      function update() {
        tickSel.data(scope.data)
          .translate(function(d) {
            return [scope.scales.x(d.x), scope.scales.y(d.y)];
          });
      }

      update();

      scope.$on('tickChange', update);
      scope.$on('windowResize', update);

    }
  }
})();
