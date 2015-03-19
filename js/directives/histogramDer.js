(function() {

  angular.module('mainApp')
    .directive('histogramDer', histogramDer)
    .controller('histogramCtrl', histogramCtrl);

  function histogramDer() {
    var directive = {
      controller: 'histogramCtrl',
      templateUrl: 'templates/histogram.html',
      controllerAs: 'hist',
      restrict: 'A'
    };
    return directive;
  }

  function histogramCtrl($scope, dataService) {
    var vm = this;
    vm.scales = {
      x: d3.scale.linear(),
      y: d3.scale.linear()
    };
    vm.scales.x.change = 0;
    vm.scales.y.change = 0;
    vm.margin = {
      top: 25,
      left: 35,
      right: 25,
      bottom: 25
    };
    vm.data = [];
    vm.dataService = dataService;
    vm.update = _.throttle(update, 250);
    vm.histo = d3.layout.histogram()
      .value(function(d) {
        return d.res.Tp - d.res.T;
      });

    update();

    vm.download = download;

    function download() {
      console.log('asdf')
      var toParse = dataService.ODs.map(function(d) {
        var r = d.res;
        return {
          T: r.T,
          D: r.D,
          Dp: r.Dp,
          Tp: r.Tp
        };
      });
      var parsed = d3.csv.format(toParse);

      // window.URL = window.webkitURL || window.URL;
      var contentType = 'text/csv';
      var csvFile = new Blob([parsed], {
        type: contentType
      });

      var a = document.createElement('a');
      a.download = 'my.csv';
      a.href = window.URL.createObjectURL(csvFile);
      a.textContent = 'Download CSV';

      a.dataset.downloadurl = [contentType, a.download, a.href].join(':');

      document.body.appendChild(a);
      a.click();

    }

    function update() {
      var xBounds = d3.extent(vm.dataService.ODs, function(d) {
        return d.res.Tp - d.res.T;
      });
      vm.scales.x.domain(xBounds);
      vm.histo.bins(20);
      vm.data = vm.histo(vm.dataService.ODs);
      var maxY = d3.max(vm.data, function(d) {
        return d.y;
      });
      vm.scales.y.domain([0, maxY]);
      vm.scales.y.change++;
      vm.scales.x.change++;
    }

  }



})();
