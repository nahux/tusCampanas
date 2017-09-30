//Servicio campañas
angular
	.module('inicio')
	.service("CampanasService", ["$q", "$timeout","$http", function($q, $timeout, $http) {
		var campanas = [];

		this.getCampanas = function() {
			var deferred = $q.defer();
			
			$http.get('/api/campanas')
				.then(function(result) {
					// save fetched posts to the local variable
					var campanasTraidas = result.data;
					// resolve the deferred
					deferred.resolve(campanasTraidas);
				}, function(error) {
					var campanasTraidas = error;
					deferred.reject(error);
				});
			
			return deferred.promise; 
		}

		//Detalle
		this.getCampana = function(idCamp) {
			var deferred = $q.defer();
			
			$timeout(function() {
				deferred.resolve(campanas.find(x => x.id == idCamp));
			}, 500);
			return deferred.promise;  
		}

		//Para nueva campaña
		var campanaNueva = {grupos:[]};
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
				campanaNueva = {};
			}, 500);
			return deferred.promise;  
		}

		this.setId = function() {
			//Nicht richtig
			campanaNueva.id = campanas[campanas.length - 1].id + 1;
		}

		this.deleteCampana = function(campana) {
			if(campanas.find(x => x.id == campana.id)){
				campanas.splice(campanas.indexOf(campana), 1); 
				return true;
			}
			else{
				return false;
			}
		}

}]);
//////

//Controller campañas
angular
	.module('inicio')
	.controller("CampanasController", ["$scope", "CampanasService", "$http", function($scope, CampanasService, $http) {
		// model
		$scope.refreshCampanas = function() {
			CampanasService.getCampanas().then(function(campanas) {
				$scope.campanas = campanas;
			});
		}
		
		$scope.refreshCampanas();	

		//Usado para nueva campaña
		$scope.setId = function (){
			CampanasService.setId();
		}

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
	.controller("DetalleCampController", ["$scope", "CampanasService", "GruposService", "$state", "$stateParams", 
																				function($scope, CampanasService, GruposService, $state, $stateParams) {
		// model
		$scope.refreshCampana = function() {
			CampanasService.getCampana($stateParams.id).then(function(campana) {
				$scope.campana = campana;
				$scope.getGruposCampana(campana);
			});
		}
		$scope.getGruposCampana = function(campana) {
			$scope.gruposCamp = GruposService.getGruposCampana(campana);
		}
		$scope.refreshCampana();

		$scope.deleteCampana = function(campana) {
			if (confirm('¿Está seguro que desea borrar la campaña?')) {
				if (CampanasService.deleteCampana(campana)) {
					alert('Campaña borrada correctamente');
				} else{
					alert('Hubo un error al borrar la campaña')
				}
				$state.go('dashboard.campanas',{});
			}
		}

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

//Componente nueva2
angular
	.module('inicio')
	.component('nuevaCampana3', {
		templateUrl: 'dashboard/nueva_campana_disenar.html'
});

//Controller
angular
	.module('inicio')
	.controller("NuevaCampController", ["$scope", "CampanasService", "GruposService", "TrackingService", "$state", "$stateParams",
										function($scope, CampanasService, GruposService, TrackingService, $state, $stateParams) {

		$scope.campana = {grupos:[]};

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
		
		$scope.addGrupos = function(grupos) {
			var gruposArray = Object.values(grupos);
			CampanasService.addGrupos(gruposArray);
			$scope.refreshNuevaCampana();
		}

		$scope.addCampana = function(campana) {
			CampanasService.addCampana(campana).then(function() {
			});
			TrackingService.addTracking(campana).then(function() {

			});
		}

}]);