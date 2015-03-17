(function() {


angular.module('mainApp')
	.directive('mapPlotDer', mapPlotDer)


	function mapPlotDer(){
		var directive = {
			controller: 'mapPlotCtrl',
			
			link: 
		};	
		return directive;
	}

});
