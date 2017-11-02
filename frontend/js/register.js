//Component
angular
	.module('app')
	.component('register', {
		templateUrl: 'register.html'
});

//Controller
angular
	.module('app')
	.controller('registerController', ['$scope','$http','$rootScope','$state','$cookieStore','UserService', 
									 									 function($scope,$http,$rootScope,$state,$cookieStore,UserService) {
		$scope.messages = {};

		$scope.registerUser = function(user) {
			UserService.registrar(user)
				.then(function(response){
					//Logueo al usuario
					var userdata = { username: user.username, password: user.password };
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
							$scope.messages[0].msg = 'Ocurrió un error';
						});
				},
				function(response) {
					//Muestro errores
					$scope.messages = response.data;
				});
		}
}]);