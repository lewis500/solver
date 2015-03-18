(function() {

  angular.module('mainApp').directive('dotDer', dotDer);

  function dotDer() {
    var directive = {
      link: link,
      templateNamespace: 'svg',
      template: "<circle ng-attr-transform='translate({{vm.scales.x(vm.data.x)}},{{vm.scales.y(vm.data.y)}})' class='dot' r='6'></circle>",
      replace: true,
      controller: angular.noop,
      bindToController: true,
      controllerAs: 'vm',
      scope: {
        dragDot: '=',
        data: '=',
        scales: '='
      }
    };
    return directive;

    function link(scope, el, attr, vm) {
      var sel = d3.select(el[0]);


      var drag = d3.behavior.drag()
        .on('drag', function(d, i) {
          vm.dragDot(vm.data, d3.event.x, d3.event.y);
        });

      sel.call(drag);
    }
  }
})();
