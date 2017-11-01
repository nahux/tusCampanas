//Component
angular
	.module('app')
	.component('register', {
		templateUrl: 'register.html'
});

//Controller
angular
	.module('app')
	.controller('registerController', ['$scope','$http','$rootScope','$state','UserService', 
									 									 function($scope,$http, $rootScope,$state,UserService) {
		$scope.message = '';

		
}]);