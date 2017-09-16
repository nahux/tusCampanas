//Servicio campañas
var campService = 
angular.module('inicio').service("CampanasService", ["$q", "$timeout", function($q, $timeout) {
	var campanas = [{
										id: 1,
										title: "México 3 días", 
										desc: "Vacaciones en México 3 días"
									},
									{
										id: 2,
										title: "Europa 21 días", 
										desc: "Vacaciones en Alemania, Francia e Italia en 21 días"
									}];
	
	this.getCampanas = function() {
		var deferred = $q.defer();
		
		$timeout(function() {
			deferred.resolve(campanas);
		}, 1000); 
		
		return deferred.promise; 
	}

	this.getCampana = function(id) {
		var deferred = $q.defer();
		
		$timeout(function() {
			function campanaMatchesParam(campana) {
        return campana.id === id;
      }
			deferred.resolve(campanas.find(campanaMatchesParam));
	  }, 500);
	  return deferred.promise;  
	}

}]);
//////

//Controller campañas
angular.module('inicio').controller("CampanasController", ["$scope", "CampanasService", function($scope, campService) {
	// model
	$scope.refreshCampanas = function() {
		campService.getCampanas().then(function(campanas) {
			$scope.campanas = campanas;
		});  
	}
	
	$scope.refreshCampanas();	
}]);

//Componente campañas
angular.module('inicio').component('compCamp', {
	bindings: { campanas: '<' },
	
	templateUrl: 'partial-campanas.html'
});
////////////////////////////////////////////////////////////////////

//VER COMO HACER PARA TRAER LA CAMPAÑA A LA VISTA Y QUE APAREZCA JUNTO CON LA LISTA DE CAMPAÑAS :(

//Componente campaña
angular.module('inicio').component('compCampana', {
	bindings: { campana: '<' },
	
	templateUrl: 'partial-campana.html'
});