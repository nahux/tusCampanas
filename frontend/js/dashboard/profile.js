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
		$scope.messages = {};
		$scope.user = {};

		$scope.refreshUser = function() {

			UserService.getUserData()
				.then(function(response){
					//Logueo al usuario
					$scope.user = response.data;
				},
				function(response) {
					//Muestro errores
					$scope.messages = response.data;
				});
		}
		$scope.refreshUser();
}]);