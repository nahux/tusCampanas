//Component
angular
	.module('app')
	.component('login', {
		templateUrl: 'login.html'
});

//Controller
angular
	.module('app')
	.controller('loginController', function($scope,$http, $rootScope,$state) {
		$scope.message = '';
		$scope.validateLogin = function(user) {
			var userdata = {
				username : user.name,
				password : user.pass
			};
			//Validar login
			$http.post('/api/users/authenticate', userdata)
				.then(function onSuccess(response) {
					// store username and token in local storage to keep user logged in between page refreshes
					$rootScope.currentUser = { username: response.data.username, token: response.data.token };
					// add jwt token to auth header for all requests made by the $http service
					$http.defaults.headers.common.Authorization = 'Bearer ' + response.data.token;

					$state.go('dashboard.campanas', {});

				}).catch(function onError(response) {
					$scope.message = 'Usuario y/o contraseña incorrectos';
				});
		}

		$scope.logOut = function() {
			delete $rootScope.currentUser;
			$http.defaults.headers.common.Authorization = '';
		}
});