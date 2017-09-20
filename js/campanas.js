//Servicio campañas
angular
	.module('inicio')
	.service("CampanasService", ["$q", "$timeout", function($q, $timeout) {
		var campanas = 
			[{
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
			},
			{
				id: 3,
				title: "Camboya 5 días", 
				desc: "Vacaciones en Camboya en 5 días",
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
			
			$timeout(function() {
				deferred.resolve(campanas.find(x => x.id == idCamp));
			}, 500);
			return deferred.promise;  
		}

		//Para nueva campaña
		var campanaNueva = {};
		this.addTitleDesc = function (campana) {
			campanaNueva.title = campana.title;
			campanaNueva.desc = campana.desc;
		}

		this.addGrupos = function (grupos) {
			campanaNueva.grupos = grupos;
		}

		this.getNuevaCampana = function() {
			var deferred = $q.defer();
			
			$timeout(function() {
				deferred.resolve(campanaNueva);
			}, 500);
			return deferred.promise;  
		}

		this.addCampana = function(campana) {
			var deferred = $q.defer();
			
			$timeout(function() {
				deferred.resolve(campanas.push(campana));
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


////////////////////////////////////////////////////////////////////

//NUEVA CAMPAÑA
//Componente nueva
angular
	.module('inicio')
	.component('nuevaCampana', {
		templateUrl: 'dashboard/nueva_campana.html'
});

//Componente nueva2
angular
	.module('inicio')
	.component('nuevaCampana2', {
		templateUrl: 'dashboard/nueva_campana_grupos.html'
});

//Controller
angular
	.module('inicio')
	.controller("NuevaCampController", ["$scope", "CampanasService", "GruposService", "$state", "$stateParams",
										function($scope, CampanasService, GruposService, $state, $stateParams) {

		$scope.campana = {};
		//$scope.grupos = [{id:1, title: "grupo1"},{id:2, title: "grupo2"}];

		$scope.addTitleDesc = function (campana) {
			CampanasService.addTitleDesc(campana);
			$scope.refreshNuevaCampana();
		}

		$scope.refreshNuevaCampana = function() {
			CampanasService.getNuevaCampana().then(function(campana) {
				$scope.campana = campana;
			});  
		}
		$scope.refreshNuevaCampana();



		//Elegir Grupos
		$scope.refreshGrupos = function() {
			GruposService.getGrupos().then(function(grupos) {
				$scope.grupos = grupos;
			});  
		}
		$scope.refreshGrupos();
		
}]);