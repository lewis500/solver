(function() {

  angular.module('mainApp')
    .factory('dataService', dataService);

  function dataService(tickService, vars, OD) {
    var DS = {
      ODs: [],
      update: update,
      X: 10,
      Y: 10,
      updateArray: updateArray
    };

    DS.array = makeArray();
    DS.ODs = makeODs();

    return DS;

    function update() {
      DS.ODs.forEach(function(d) {
        d.solve();
      });
    }

    function updateArray() {
      DS.array.forEach(function(d, i) {
        d.x = d.col * vars.X / DS.X;
        d.y = d.row * vars.Y / DS.Y;
      });
    }

    function makeArray() {
      var res = [];
      _.range(DS.X + 1).forEach(function(x) {
        _.range(DS.Y + 1).forEach(function(y) {
          res.push({
            col: x,
            row: y,
            x: x * vars.X / DS.X,
            y: y * vars.Y / DS.Y
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
