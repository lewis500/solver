(function() {
  angular.module('mainApp')
    .factory('OD', OD);

  function OD(vars, tickService) {

    var OD = {
      init: init,
      solve: solve
    };

    OD.constructor = "OD";

    return OD;

    function init(O, D) {
      this.O = O;
      this.D = D;
      this.res = {
        D: manhattan(O, D),
        T: manhattan(O, D) / vars.vB,
        Dp: 0,
        Tp: 0,
        Dpp: 0,
        Tpp: 0,
        combo: {}
      };
    }

    function manhattan(a, b) {
      return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
    }

    function solve() {
      var self = this,
        O = this.O,
        D = this.D,
        res = {
          dist: 1000,
          time: 1000,
          combo: null
        };
      tickService
        .combos
        .forEach(function(v) {
          var d0 = manhattan(O, v.O),
            d1 = manhattan(D, v.D),
            d2 = v.euclid;
          var time = (d0 + d1) / vars.vB + d2 / vars.vS;
          var dist = d0 + d1 + d2;
          if (time > res.time) return;
          res.dist = dist;
          res.time = time;
          res.combo = v;
        });

      _.assign(self.res, {
        Tp: res.time,
        Dp: res.dist,
        combo: res.combo
      });
    }

  }
})()
