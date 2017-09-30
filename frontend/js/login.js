//Component
angular
	.module('inicio')
	.component('login', {
		templateUrl: 'login.html'
});

//Controller
angular
	.module('inicio')
	.controller('loginController', function($scope) {
		$scope.validateLogin = function(user) {
			//Validar login
	}
});