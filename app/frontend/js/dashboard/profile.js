//Component
angular
	.module('app')
	.component('profile', {
		templateUrl: 'dashboard/profile.html'
});

//Controller
angular
	.module('app')
	.controller('profileController', ['$scope','$rootScope','$state','$cookieStore','UserService', 
									 									 function($scope,$rootScope,$state,$cookieStore,UserService) {
		$scope.errorMessages = {};
		$scope.successMessage = '';

		$scope.user = {};


		$scope.refreshUser = function() {

			UserService.getUserData()
				.then(function(response){
					//Logueo al usuario
					$scope.user = response.data;
				},
				function(response) {
					//Muestro errores
					$scope.message = response.data;
				});
		}
		$scope.refreshUser();

		$scope.updateUser = function(userdata) {

			UserService.actualizarUser(userdata)
				.then(function(response) {
					//Se modificó con éxito
					$scope.message = '';
					$scope.errorMessages = {};
					$scope.successMessage = '¡Datos modificados satisfactoriamente!';
				},
				function(response) {
					//Fallo la modificacion
					$scope.message = '';
					$scope.successMessage = '';
					$scope.errorMessages = response.data ;
				})
			
			$scope.refreshUser();
		}
}]);;