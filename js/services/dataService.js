(function() {

  angular.module('mainApp')
    .factory('dataService', dataService);

  function dataService(tickService, vars, OD) {
    var DS = {
      ODs: [],
      update: update,
      // update2: update2,
      X: 6,
      Y: 6,
      array: []
    };

    DS.array = makeArray();
    DS.ODs = makeODs();

    return DS;

    function update() {
      DS.ODs
        .forEach(function(d) {
          d.solve();
        });
    }

    function makeArray() {
      var res = [];
      _.range(DS.X).forEach(function(x) {
        _.range(DS.Y).forEach(function(y) {
          res.push({
            x: x * Math.round(vars.xMax / DS.X),
            y: y * Math.round(vars.yMax / DS.Y)
          });
        });
      });
      return res;
    }

    function makeODs() {
      var res = [];
      DS.array
        .forEach(function(O, i) {
          DS.array.slice(i + 1)
            .forEach(function(D) {
              var newOD = Object.create(OD);
              newOD.init(O, D);
              res.push(newOD);
            });
        });
      return res;
    }

  }



})();
