//Servicio campañas
angular
	.module('inicio')
	.service("CampanasService", ["$q", "$timeout", function($q, $timeout) {
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
			return deferred.promise;  
		}

}]);
//////

//Controller campañas
angular
	.module('inicio')
	.controller("CampanasController", ["$scope", "CampanasService", function($scope, CampanasService) {
		// model
		$scope.refreshCampanas = function() {
			CampanasService.getCampanas().then(function(campanas) {
				$scope.campanas = campanas;
			});  
		}
		
		$scope.refreshCampanas();	
}]);

//Componente campañas
angular
	.module('inicio')
	.component('campanas', {
		templateUrl: 'dashboard/campanas.html'
});
////////////////////////////////////////////////////////////////////

//DETALLE CAMPAÑA

//Componente campaña
angular
	.module('inicio')
	.component('campanaDetalle', {
		templateUrl: 'dashboard/campana_detalle.html'
});
//Controller campaña
angular
	.module('inicio')
	.controller("DetalleCampController", ["$scope", "CampanasService", "$state", "$stateParams", function($scope, CampanasService, $state, $stateParams) {
		// model
		$scope.refreshCampana = function() {
			CampanasService.getCampana($stateParams.id).then(function(campana) {
				$scope.campana = campana;
			});  
		}
		$scope.refreshCampana();
}]);