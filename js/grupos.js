//Servicio grupos
angular
	.module('inicio')
	.service("GruposService", ["$q", "$timeout", function($q, $timeout) {
		var clientes = [
						{id: 1, nombre: "Juan", apellido: "Pérez"}, 
						{id: 2, nombre: "Marcos", apellido: "López"},
						{id: 3, nombre: "Darío", apellido: "Rossi"} ]
		var grupos = 
					[{	id: 1,
						title: "Adultos", 
						desc: "Adultos, de 18 a 80 años", 
						clientes: {
									"cliente1":"Juan",
									"cliente2":"Marcos",
						}
					 },
					 {
						id: 2,
						title: "Adultos La Plata", 
						desc: "Adultos de La Plata, de 18 a 80 años", 
						clientes: {
									"cliente1":"Lorena",
									"cliente2":"Mariano",
						}
					}];
		
		this.getGrupos = function() {
			var deferred = $q.defer();
			
			$timeout(function() {
				deferred.resolve(grupos);
			}, 1000); 
			
				return deferred.promise; 
		}

		this.getGrupo = function(idGrupo) {
			var deferred = $q.defer();
			
			$timeout(function() {
				deferred.resolve(grupos.find(x => x.id == idGrupo));
			}, 500);
			return deferred.promise;  
		}

		this.getGruposCampana = function(campana) {
			var gruposCamp = [];
			for (var i = 0; i < campana.grupos.length; i++) {
				var idGrupo = campana.grupos[i].id;
				gruposCamp[i] = grupos.find(x => x.id == idGrupo).title
			};
			return gruposCamp;
		}

		this.getClientes = function() {
			var deferred = $q.defer();
			
			$timeout(function() {
				deferred.resolve(clientes);
			}, 1000); 
			return deferred.promise; 
		}	

		this.addGrupo = function(grupo) {
			var deferred = $q.defer();
			
			grupo.id = grupos[grupos.length - 1].id + 1;
			$timeout(function() {
				deferred.resolve(grupos.push(grupo));
			}, 500);
			return deferred.promise;  
		}

	}]);

//Controller grupos
angular
	.module('inicio')
	.controller("GruposController", ["$scope", "GruposService", function($scope, GruposService) {
		// model
		$scope.refreshGrupos = function() {
			GruposService.getGrupos().then(function(grupos) {
				$scope.grupos = grupos;
			});  
		}
		
		$scope.refreshGrupos();	
}]);

//Componente grupos
angular
	.module('inicio')
	.component('grupos', {
		templateUrl: 'dashboard/grupos.html'
});
////////////////////////////////////////////

//DETALLE
//Componente grupo
angular
	.module('inicio')
	.component('grupoDetalle', {
		templateUrl: 'dashboard/grupo_detalle.html'
});
//Controller grupo
angular
	.module('inicio')
	.controller("DetalleGrupoController", ["$scope", "GruposService", "$state", "$stateParams", function($scope, GruposService,$state,$stateParams) {
		// model
		$scope.refreshGrupo = function() {
			GruposService.getGrupo($stateParams.id).then(function(grupo) {
				$scope.grupo = grupo;
			});
		}
		$scope.refreshGrupo();
}]);


////////////////////////////////////////////

//DETALLE
//Componente nuevogrupo
angular
	.module('inicio')
	.component('nuevoGrupo', {
		templateUrl: 'dashboard/nuevo_grupo.html'
});

angular
	.module('inicio')
	.controller("NuevoGrupoController", ["$scope", "GruposService", "$state", "$stateParams", function($scope, GruposService,$state,$stateParams) {
		$scope.grupo = {clientes:[]};
		$scope.refreshClientes = function() {
			GruposService.getClientes().then(function(clientes) {
				$scope.clientes = clientes;
			});
		}
		$scope.refreshClientes();

		$scope.createGrupo = function(grupo) {
			GruposService.addGrupo(grupo).then(function() {

			})
		}
}]);