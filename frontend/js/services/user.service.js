//Servicio Usuario
angular
	.module('app')
	.service("UserService", ["$q", "$timeout","$http", function($q, $timeout, $http) {
	
		this.autenticar = function(userdata) {
			 var defered = $q.defer();
			//Validar login
			$http.post('/api/users/authenticate', userdata)
				.then(function(response) {
					defered.resolve(response.data.token)
				},function(response) {
					defered.reject(false);
				});

			return defered.promise;
		}

		this.registrar = function(userdata) {
			var defered = $q.defer();

			//Llamo a la api para registrar
			$http.post('/api/users/register', userdata)
				.then(function(response) {
					defered.resolve(response)
				},function(response) {
					defered.reject(response);
				});

				return defered.promise;
		}


		this.getUserData = function() {
			var defered = $q.defer();

			//Llamo a la api para traer datos de usuario
			$http.get('/api/users/current')
				.then(function(response) {
					defered.resolve(response)
				},function(response) {
					defered.reject(response);
				});

				return defered.promise;
		}

		this.actualizarUser = function(userdata) {
			var defered = $q.defer();

			//Llamo a api para actualizar usuario
			$http.put('/api/users/'+userdata._id, userdata)
				.then(function(response) {
					defered.resolve(response);
				},function(response) {
					defered.reject(response);
				});

			return defered.promise;
		}
}]);
