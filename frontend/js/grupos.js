//Factory para RESOURCE
angular.module('inicio').factory('EntryGrupos', function($resource) {
	return $resource('/api/grupos/:id',{'id' : '@id'}, {
			'query': { method: 'GET', isArray: true},
			'update': { method: 'PUT' },
			'save': { method: 'POST' },
			'remove': { method:'DELETE' }
		});
});

//Servicio grupos
angular
	.module('inicio')
	.service("GruposService", ["$q", "$timeout", "EntryGrupos", function($q, $timeout, EntryGrupos) {
		var clientes = [
						{id: 1, nombre: "Juan", apellido: "Pérez"}, 
						{id: 2, nombre: "Marcos", apellido: "López"},
						{id: 3, nombre: "Darío", apellido: "Rossi"} ]
		var grupos = 
					[{	id: 1,
						title: "Adultoso", 
						desc: "Adultos, de 18 a 80 años", 
						clientes: [
									{id:2},
									{id:3}
						]
					 },
					 {
						id: 2,
						title: "Adultoso La Plata", 
						desc: "Adultos de La Plata, de 18 a 80 años", 
						clientes: [
									{id:1}
						]
					}];
		
		this.getGrupos = function() {
			var deferred = $q.defer();
			
			var gruposTraidos = EntryGrupos.query(function(){
				deferred.resolve(gruposTraidos);
			});
			
			return deferred.promise; 
		}

		this.getGrupo = function(idGrupo) {
			var deferred = $q.defer();
			
			var grupoTraido = EntryGrupos.get({id:idGrupo},function(){
				deferred.resolve(grupoTraido);
			});

			return deferred.promise;  
		}

		this.getClientesGrupo = function(grupo) {
			var clientesGrupo = [];
			var i = 0;
			Array.from(grupo.clientes).forEach(function (cliente) {
		  		var idCliente = cliente.id;
		  		if (idCliente) {
	  				clientesGrupo[i] = clientes.find(x => x.id == idCliente);
		  		}
				
				i++;
			});
			return clientesGrupo;
		}

		this.getGruposCampana = function(campana) {
			var deferred = $q.defer();

			var gruposCamp = [];
			var i = 0;
			campana.grupos.forEach(function (grupo) {
	  		var idGrupo = grupo.id;
	  		if (idGrupo) {
					gruposCamp[i] = EntryGrupos.get({id:idGrupo},function(){
						deferred.resolve(gruposCamp[i]);
					});
				}
				i++;
			});
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
			
			var grupoCreado = EntryGrupos.save(grupo,function(){
				deferred.resolve(grupoCreado);
			});

			return deferred.promise;  
		}

		this.deleteGrupo = function(grupo) {
			var deferred = $q.defer();

			var grupoBorrado = EntryGrupos.remove({id:grupo.id}, function(){
				deferred.resolve(grupoBorrado);
			});

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

		$scope.deleteGrupo = function(grupo) {
			if (confirm('¿Está seguro que desea borrar el grupo?')) {
				if (GruposService.deleteGrupo(grupo)) {
					alert('Grupo borrado correctamente');
				} else{
					alert('Hubo un error al borrar el grupo')
				}
				$state.go('dashboard.grupos',{},{reload:true});
			}
		}
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
			grupo.clientes = Object.values(grupo.clientes);
			GruposService.addGrupo(grupo).then(function() {

			});
			$state.go('dashboard.grupos',{},{reload:true});
		}
}]);