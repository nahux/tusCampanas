//Servicio grupos
var grupoService = 
angular.module('inicio').service("GruposService", ["$q", "$timeout", function($q, $timeout) {
	var clientes = [{"juan": {nombre: "Juan", apellido: "Pérez"}, "marcos": {nombre: "Marcos", apellido: "Pérez"}} ]
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
		
		//Averiguar porqué no anda con promise
		$timeout(function() {
			deferred.resolve(grupos.find(x => x.id == idGrupo));
		}, 500);
		return grupos.find(x => x.id == idGrupo);  
	}
}]);

//Controller grupos
angular.module('inicio').controller("GruposController", ["$scope", "GruposService", function($scope, grupoService) {
	// model
	$scope.refreshGrupos = function() {
		grupoService.getGrupos().then(function(grupos) {
			$scope.grupos = grupos;
		});  
	}
	
	$scope.refreshGrupos();	
}]);

//Componente grupos
angular.module('inicio').component('compGrupos', {
	bindings: { grupos: '<' },
	
	templateUrl: 'partial-grupos.html'
});
////////////////////////////////////////////

//DETALLE
//Controller grupo
angular.module('inicio').controller("DetalleGrupoController", ["$scope", "GruposService", "$state", "$stateParams", function($scope, GruposService,$state,$stateParams) {
	// model
	$scope.grupo = GruposService.getGrupo($stateParams.id);	
}]);