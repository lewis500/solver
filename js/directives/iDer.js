(function() {

  angular.module('mainApp').directive('iDer', iDer);

  function iDer() {
    var directive = {
      controller: angular.noop,
      link: link,
      scope: {
        data: '=',
        scales: '='
      },
      bindToController: true,
      controllerAs: 'vm'
    };
    return directive;

    function link(scope, el, attr, vm) {
      var dots = d3.select(el[0]).selectAll('lilDot')
        .data(vm.data)
        .enter()
        .append('circle.lilDot')
        .attr('r', 1)


      function update() {
        dots.translate(function(d) {
          return [vm.scales.x(d.x), vm.scales.y(d.y)];
        });
      }

      update();

      scope.$on('windowResize', update);

    }

  }

})();
