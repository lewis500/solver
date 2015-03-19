(function() {

  angular.module('mainApp')
    .directive('plotDer', plotDer)
    .controller('plotCtrl', plotCtrl);

  function plotCtrl($scope, $element, $window) {
      var plt = this;
      plt.resize = resize;
      var par = $element.parent()[0];

      angular.element($window)
        .bind('resize', function() {
          $scope.$evalAsync(plt.resize);
        });

      function resize() {
        var w = par.clientWidth;
        plt.width = w - plt.m.left - plt.m.right;
        plt.height = w * plt.aspectRatio - plt.m.top - plt.m.bottom;
        plt.scales.x.range([0, plt.width]);
        plt.scales.y.range([plt.height, 0]);
        $scope.$broadcast('windowResize');
      }
    } //end controller

  function plotDer() {
    var directive = {
      controller: 'plotCtrl',
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

  }

})();
