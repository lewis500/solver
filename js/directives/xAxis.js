(function() {
    angular.module('mainApp').directive('exAxis', XAxis);

    function XAxis() {
        var directive = {
            restrict: 'A',
            link: link,
            scope: {
                height: '=h',
                scale: '=scale'
            }
        };

        return directive;

        function link(scope, el, attr) {
            var axisFun = d3.svg.axis()
                .scale(scope.scale)
                .ticks(5)
                .tickSize(-scope.height)
                .orient("bottom");
            var sel = d3.select(el[0]).call(axisFun);
            scope.$on('windowResize', function() {
                axisFun.tickSize(-scope.height);
                sel.call(axisFun);
            });
        };
    }
})();
