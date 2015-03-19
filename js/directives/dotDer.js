(function() {

  angular.module('mainApp').directive('dotDer', dotDer);

  function dotDer() {
    var directive = {
      link: link,
      templateNamespace: 'svg',
      template: "<circle ng-attr-transform='translate({{scales.x(data.x)}},{{scales.y(data.y)}})' class='dot' r='6'></circle>",
      replace: true,
      scope: {
        dragDot: '=',
        data: '=',
        scales: '=',
        histUpdate: '='
      }
    };
    return directive;

    function link(scope, el, attr) {
      var sel = d3.select(el[0]);

      var dragger = _.throttle(function(x, y) {
        scope.$apply(function() {
          scope.dragDot(scope.data, x, y);
        });
      }, 250);

      var drag = d3.behavior.drag()
        .on('drag', function() {
          var x = d3.event.x,
            y = d3.event.y;
          dragger(x, y);
        });

      sel.call(drag);
    }
  }
})();
