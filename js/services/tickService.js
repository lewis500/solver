(function() {

  angular.module('mainApp').factory('tickService', tickService);

  function tickService() {
    var TS = {
      combos: [],
      ticks: [],
      numTicks: 25,
      updateTicks: updateTicks
    };

    TS.ticks = _.range(0, TS.numTicks)
      .map(function(d) {
        return {
          x: 0,
          y: 0,
          i: d
        };
      });

    TS.ticks
      .forEach(function(O) {
        TS.ticks.forEach(function(D) {
          TS.combos.push({
            O: O,
            D: D
          });
        });
      });

    TS.xScale = d3.scale.linear()
      .domain([0, TS.numTicks])
      .range([0, 0]);

    TS.yScale = d3.scale.linear()
      .domain([0, TS.numTicks])
      .range([0, 0]);

    return TS;

    function euclid(a, b) {
      return Math.pow(Math.pow(a.x - b.x, 2), Math.pow(a.y - b.y, 2), .5);
    }


    function updateTicks(C1, C2) {
      TS.yScale.range([C1.y, C2.y]);
      TS.xScale.range([C1.x, C2.x]);


      TS.ticks
        .forEach(function(d) {
          _.assign(d, {
            x: TS.xScale(d.i),
            y: TS.yScale(d.i),
          });
        });

      TS.combos.forEach(function(d) {
        d.euclid = euclid(d.O, d.D);
      });
    }
  }

})();
