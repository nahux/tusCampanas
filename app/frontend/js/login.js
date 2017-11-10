//Component
angular
	.module('app')
	.component('login', {
		templateUrl: 'login.html'
});

//Controller
angular
	.module('app')
	.controller('loginController', ['$scope','$http','$rootScope','$state','$cookieStore','UserService', 
																  function($scope,$http, $rootScope,$state,$cookieStore,UserService) {
		$scope.message = '';
		$scope.validateLogin = function(user) {
			var userdata = {
				username : user.name,
				password : user.pass
			};
			//Validar login
			UserService.autenticar(userdata)
				.then(function(token){
					// Agrego token al header auth para las próximas requests
					$http.defaults.headers.common.Authorization = 'Bearer ' + token;
					// Guardo token y usuario en cookie
					var currentUser = { username: userdata.username, token: token };
					$cookieStore.put('currentUser', currentUser);
					$rootScope.username = currentUser.username;

					//Redirigo a campañas			
					$state.go('dashboard.campanas',{}, {reload:true});
				},
				function(data){
					$scope.message = 'Usuario y/o contraseña incorrectos';
				});
		}

		$scope.logOut = function() {
			//Borro el usuario de la rootScope y el token del header
			delete $rootScope.username;
			$cookieStore.remove('currentUser');
			$http.defaults.headers.common.Authorization = '';
		}

}]);