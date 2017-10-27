//Component
angular
	.module('app')
	.component('login', {
		templateUrl: 'login.html'
});

//Controller
angular
	.module('app')
	.controller('loginController', function($scope) {
		$scope.validateLogin = function(user) {
			//Validar login
	}
});