//Factory para RESOURCE
angular.module('app').factory('EntryCampanas', function($resource) {
	return $resource('/api/campanas/:id',{'id' : '@id'}, {
			'query': { method: 'GET', isArray: true},
			'update': { method: 'PUT' },
			'save': { method: 'POST' },
			'remove': { method:'DELETE' }
		});
});

//Servicio campañas
angular
	.module('app')
	.service("CampanasService", ["$q", "$timeout","$http", "EntryCampanas", function($q, $timeout, $http, EntryCampanas) {
		var campanas = [];

		this.getCampanas = function() {
			var deferred = $q.defer();
			
			var campanasTraidas = EntryCampanas.query(function() {
				deferred.resolve(campanasTraidas);
			},function(error){
				deferred.reject(error.data);
			}); 
			
			return deferred.promise;
		}

		//Detalle
		this.getCampana = function(idCamp) {
			var deferred = $q.defer();

			var campanaTraida = EntryCampanas.get({id:idCamp},function(){
				deferred.resolve(campanaTraida);
			},function(error){
				deferred.reject(error.data);
			})
			
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

		this.addCampana = function(campanaNew) {
			var deferred = $q.defer();
			
			var campanaCreada = EntryCampanas.save(campanaNew,function(){
				deferred.resolve(campanaCreada);
			},function(error){
				deferred.reject(error.data);
			})

			return deferred.promise;  
		}

		this.modificarCampana = function(campana) {
			var deferred = $q.defer();
			
			var campanaModificada = EntryCampanas.update({id:campana._id},campana,function(){
				deferred.resolve(campanaModificada);
			},function(error){
				deferred.reject(error.data);
			})

			return deferred.promise;  
		}

		this.deleteCampana = function(campana) {
			var deferred = $q.defer();
			
			var campanaBorrada = EntryCampanas.remove({id:campana._id},campana,function(){
				deferred.resolve(campanaBorrada);
			},function(error){
				deferred.reject(error.data);
			})			

			return deferred.promise;  
		}

}]);
//////

//Controller campañas
angular
	.module('app')
	.controller("CampanasController", ["$scope", "CampanasService", "$http", function($scope, CampanasService, $http) {
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
	.module('app')
	.component('campanas', {
		templateUrl: 'dashboard/campanas.html'
});
////////////////////////////////////////////////////////////////////

//DETALLE CAMPAÑA

//Componente campaña
angular
	.module('app')
	.component('campanaDetalle', {
		templateUrl: 'dashboard/campana_detalle.html'
});

//Controller campaña
angular
	.module('app')
	.controller("DetalleCampController", ["$scope", "CampanasService", "GruposService", "$state", "$stateParams", 
																				function($scope, CampanasService, GruposService, $state, $stateParams) {
		// model
		$scope.refreshCampana = function() {
			CampanasService.getCampana($stateParams.id)
			.then(function(campana) {
				$scope.campana = campana;
				$scope.getGruposCampana(campana);
			},function(error) {
				alert(error);
				$state.go('dashboard.campanas',{},{reload:true});
			});
		}
		$scope.getGruposCampana = function(campana) {
			$scope.gruposCamp = GruposService.getGruposCampana(campana);
		}
		$scope.refreshCampana();

		$scope.deleteCampana = function(campana) {
			if (confirm('¿Está seguro que desea borrar la campaña?')) {
				if (CampanasService.deleteCampana(campana)) {
					alert('Campaña "'+campana.title+'" borrada correctamente');
				} else{
					alert('Hubo un error al borrar la campaña')
				}
				$state.go('dashboard.campanas',{}, {reload:true});
			}
		}

}]);


////////////////////////////////////////////////////////////////////

//NUEVA CAMPAÑA
//Componente nueva
angular
	.module('app')
	.component('nuevaCampana', {
		templateUrl: 'dashboard/nueva_campana.html'
});

//Componente nueva2
angular
	.module('app')
	.component('nuevaCampana2', {
		templateUrl: 'dashboard/nueva_campana_grupos.html'
});

//Componente nueva2
angular
	.module('app')
	.component('nuevaCampana3', {
		templateUrl: 'dashboard/nueva_campana_disenar.html'
});

//Controller
angular
	.module('app')
	.controller("NuevaCampController", ["$scope", "CampanasService", "GruposService", "TrackingService", "$state", "$stateParams", "$rootScope",
										function($scope, CampanasService, GruposService, TrackingService, $state, $stateParams, $rootScope) {

		$scope.campana = {grupos:[]};
		
		$scope.contentEditor = '';
			// Editor options.
		$scope.options = {
			language: 'es',
			allowedContent: true,
			entities: false
		};

		$scope.addTitleDesc = function (campana) {
			CampanasService.addTitleDesc(campana);
			$scope.refreshNuevaCampana();
			$state.go('dashboard.campanas.nueva2',{},{reload:true});
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
			var nuevaCampana = {};
			campana.contenido = $scope.contentEditor;
			CampanasService.addCampana(campana)
				.then(function(nueva) {
					TrackingService.addTracking(nueva)
						.then(function() {
						});
				}, function(response) {
					$rootScope.errorMessages = response;
					$state.go('dashboard.campanas.nueva',{},{reload:true});
				});
			
			$state.go('dashboard.campanas',{},{reload:true});
		}

}]);


////////////////////////////////////////////////////////////////////

//MODIFICAR CAMPAÑA

//Componente campaña
angular
	.module('app')
	.component('campanaModificar', {
		templateUrl: 'dashboard/modificar_campana.html'
});

//Controller campaña
angular
	.module('app')
	.controller("ModCampController", ["$scope", "CampanasService", "GruposService", "$state", "$stateParams", 
																				function($scope, CampanasService, GruposService, $state, $stateParams) {
		// model
		$scope.refreshCampana = function() {
			CampanasService.getCampana($stateParams.id)
				.then(function(campana) {
					$scope.campana = campana;
					$scope.getGruposCampana(campana);
				},function(error) {
					alert(error);
					$state.go('dashboard.campanas',{},{reload:true});
				});
		}
		$scope.getGruposCampana = function(campana) {
			$scope.gruposCamp = GruposService.getGruposCampana(campana);
		}
		$scope.refreshCampana();


		$scope.modificarCampana = function(campana) {
			CampanasService.modificarCampana(campana).then(function(campana){

			});
			$state.go('dashboard.campanas',{},{reload:true});
		}

}]);