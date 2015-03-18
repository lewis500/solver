(function() {

    angular.module('mainApp')
        .directive('plotDer', plotDer)
        .controller('plotDerCtrl', plotDerCtrl);

    function plotDerCtrl($scope, $element, $window) {
            var vm = this;
            var par = $element.parent()[0];

            $scope.$watch(function() {
                return par.clientWidth;
            }, resize);

            function resize(w) {
                vm.width = w;
                vm.height = w * vm.aspectRatio;
                vm.scales.x.range([0, w]);
                vm.scales.y.range([vm.height, 0]);
            }
        } //end controller

    function plotDer() {
        var directive = {
            controller: 'plotDerCtrl',
            templateNamespace: 'svg',
            templateUrl: 'plot2.html',
            controllerAs: 'vm',
            bindToController: true,
            scope: {
                M: '=',
                scales: '=',
                template: '=',
                aspectRatio: '='
            }
        };

        return directive;
    }


})();
