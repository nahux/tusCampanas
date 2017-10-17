//Factory para RESOURCE
angular.module('inicio').factory('Entry', function($resource) {
	return $resource('/api/campanas/:id',{'id' : '@id'}, {
			'query': { method: 'GET', isArray: true},
			'update': { method: 'PUT' },
			'save': { method: 'POST' },
			'remove': { method:'DELETE' }
		});
});

//Servicio campañas
angular
	.module('inicio')
	.service("CampanasService", ["$q", "$timeout","$http", "Entry", function($q, $timeout, $http, Entry) {
		var campanas = [];

		this.getCampanas = function() {
			var deferred = $q.defer();
			
			var campanasTraidas = Entry.query(function() {
				deferred.resolve(campanasTraidas);
			})
			
			return deferred.promise;
		}

		//Detalle
		this.getCampana = function(idCamp) {
			var deferred = $q.defer();

			var campanaTraida = Entry.get({id:idCamp},function(){
				deferred.resolve(campanaTraida);
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
			
			var campanaCreada = Entry.save(campanaNew,function(){
				deferred.resolve(campanaCreada);
			})

			return deferred.promise;  
		}

		this.modificarCampana = function(campana) {
			var deferred = $q.defer();
			
			var campanaModificada = Entry.update(campana,function(){
				deferred.resolve(campanaModificada);
			})

			return deferred.promise;  
		}

		this.deleteCampana = function(campana) {
			var deferred = $q.defer();
			
			var campanaBorrada = Entry.remove({id:campana.id},function(){
				deferred.resolve(campanaBorrada);
			})			

			return deferred.promise;  
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
			var nuevaCampana;
			CampanasService.addCampana(campana).then(function() {
				nuevaCampana = campana;
			});
			TrackingService.addTracking(campana).then(function() {

			});
			$state.go('dashboard.campanas',{},{reload:true});
		}

}]);


////////////////////////////////////////////////////////////////////

//MODIFICAR CAMPAÑA

//Componente campaña
angular
	.module('inicio')
	.component('campanaModificar', {
		templateUrl: 'dashboard/modificar_campana.html'
});

//Controller campaña
angular
	.module('inicio')
	.controller("ModCampController", ["$scope", "CampanasService", "GruposService", "$state", "$stateParams", 
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


		$scope.modificarCampana = function(campana) {
			CampanasService.modificarCampana(campana).then(function(campana){

			});
			$state.go('dashboard.campanas',{},{reload:true});
		}

}]);