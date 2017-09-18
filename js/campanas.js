//Servicio campañas
var campService = 
angular.module('inicio').service("CampanasService", ["$q", "$timeout", function($q, $timeout) {
	var campanas = [{
										id: 1,
										title: "México 3 días", 
										desc: "Vacaciones en México 3 días",
										grupos: {
											"2":"Adultos"
										}
									},
									{
										id: 2,
										title: "Europa 21 días", 
										desc: "Vacaciones en Alemania, Francia e Italia en 21 días",
										grupos: {
											"1":"Adultos La Plata"
										}
									}];
	
	this.getCampanas = function() {
		var deferred = $q.defer();
		
		$timeout(function() {
			deferred.resolve(campanas);
		}, 1000); 
		
		return deferred.promise; 
	}

	this.getCampana = function(idCamp) {
		var deferred = $q.defer();
		
		//Averiguar porqué no anda con promise
		$timeout(function() {
			deferred.resolve(campanas.find(x => x.id == idCamp));
		}, 500);
		return campanas.find(x => x.id == idCamp);  
	}

}]);
//////

//Controller campañas
var CampanasController =
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
angular
	.module('inicio')
	.component('dashboard.campana', {
		templateUrl: 'dashboard/campanas.html'
});
////////////////////////////////////////////////////////////////////

//DETALLE CAMPAÑA

//Controller campaña
var campanaCtrl =
angular.module('inicio').controller("DetalleCampController", ["$scope", "CampanasService", "$state", "$stateParams", function($scope, CampanasService, $state, $stateParams) {
	// model
	$scope.campana = CampanasService.getCampana($stateParams.id);	
}]);