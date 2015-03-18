(function() {

  angular.module('mainApp')
    .directive('plotDer', plotDer)

  function plotDer() {
    var directive = {
      controller: controller,
      templateNamespace: 'svg',
      templateUrl: 'templates/plot.html',
      controllerAs: 'plt',
      bindToController: true,
      transclude: true,
      scope: {
        m: '=',
        scales: '=',
        aspectRatio: '='
      }
    };

    return directive;

    function controller($scope, $element, $window) {
        var plt = this;
        plt.resize = resize;
        var par = $element.parent()[0];

        angular.element($window).bind('resize', plt.resize);

        function resize() {
          var w = par.clientWidth;
          plt.width = w - plt.m.left - plt.m.right;
          plt.height = w * plt.aspectRatio - plt.m.top - plt.m.bottom;
          plt.scales.x.range([0, w]);
          plt.scales.y.range([plt.height, 0]);
          $scope.$apply();
          $scope.$broadcast('windowResize');
        }
      } //end controller

  }

})();
