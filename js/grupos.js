//Servicio grupos
var grupoService = 
angular.module('inicio').service("GruposService", ["$q", "$timeout", function($q, $timeout) {
	var clientes = [{"juan": {nombre: "Juan", apellido: "Pérez"}, "marcos": {nombre: "Marcos", apellido: "Pérez"}} ]
	var grupos = 
				[{	title: "Adultos", 
					desc: "Adultos, de 18 a 80 años", 
					clientes: {
								"cliente1":"Juan",
								"cliente2":"Marcos",
					}
				 },
				 {
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