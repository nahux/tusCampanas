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
						clientes: [
									{id:2},
									{id:3}
						]
					 },
					 {
						id: 2,
						title: "Adultos La Plata", 
						desc: "Adultos de La Plata, de 18 a 80 años", 
						clientes: [
									{id:1}
						]
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

		this.getClientesGrupo = function(grupo) {
			var clientesGrupo = [];
			var i = 0;
			Array.from(grupo.clientes).forEach(function (cliente) {
		  		var idCliente = cliente.id;
				clientesGrupo[i] = clientes.find(x => x.id == idCliente);
				i++;
			})
			/*for (var i = 0; i < grupo.clientes.length; i++) {
				var idCliente = grupo.clientes[i].id;
				clientesGrupo[i] = clientes.find(x => x.id == idCliente);
			};*/
			return clientesGrupo;
		}

		this.getGruposCampana = function(campana) {
			var gruposCamp = [];
			var i = 0;
			campana.grupos.forEach(function (grupo) {
		  		var idGrupo = grupo.id;
				gruposCamp[i] = grupos.find(x => x.id == idGrupo);
				i++;
			})
			/*for (var i = 0; i < campana.grupos.length; i++) {
				var idGrupo = campana.grupos[i].id;
				gruposCamp[i] = grupos.find(x => x.id == idGrupo)
			};*/
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
		$scope.refreshGrupo = function() {
			GruposService.getGrupo($stateParams.id).then(function(grupo) {
				$scope.grupo = grupo;
				$scope.getClientesGrupo(grupo);
			});
		}
		$scope.getClientesGrupo = function(grupo) {
			$scope.clientes = GruposService.getClientesGrupo(grupo);
		}
		$scope.refreshGrupo();
}]);


////////////////////////////////////////////

//NUEVO
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