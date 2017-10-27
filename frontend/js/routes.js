//Config States
angular
	.module('app')
	.config(routesConfig)
	.run(run);

	function routesConfig($stateProvider, $urlRouterProvider, $locationProvider){
		$urlRouterProvider.otherwise('/');
		//Estado inicio
		$stateProvider
			.state('inicio', {
				url: '/',
				component: 'inicio'
			});

		//Estado login	
		$stateProvider
			.state('login', {
				url: '/login',
				component: 'login'
			});

		$stateProvider
			.state('dashboard', {
				url: '/dashboard',
				component: 'dashboard',
			});

		//Estados campañas
		$stateProvider
			.state('dashboard.campanas', {
				url: '/campanas',
				component: 'campanas',
			});

		$stateProvider
			.state('dashboard.campanas.detalle', {
				url: '/:id', 
				component: 'campanaDetalle'
			});

		$stateProvider
			.state('dashboard.campanas.nueva', {
				url: '/nueva',		
				component: 'nuevaCampana',
			});

		$stateProvider
			.state('dashboard.campanas.nueva2', {
				url: '/nueva_grupos',		
				component: 'nuevaCampana2',
			});

		$stateProvider
			.state('dashboard.campanas.nueva3', {
				url: '/nueva_disenar',		
				component: 'nuevaCampana3',
			});

		$stateProvider
			.state('dashboard.campanas.modificar', {
				url: '/:id', 
				component: 'campanaModificar'
			});

		//Estados Grupos
		$stateProvider
			.state('dashboard.grupos', {
				url: '/grupos',
				component: 'grupos',
			});

		$stateProvider
			.state('dashboard.grupos.detalle', { 
				url: '/:id',
				component: 'grupoDetalle'
			});

		$stateProvider
			.state('dashboard.grupos.nuevo', {
				url: '/nuevo',		
				component: 'nuevoGrupo',
			});

		//Estados tracking
		$stateProvider
			.state('dashboard.tracking', {
				url:'/tracking',
				component: 'tracking'
			});

		$stateProvider
			.state('dashboard.tracking.detalle', {
				url:'/:id',
				component: 'trackingDetalle'
			});
	}

	function run($http, $rootScope, $window) {
        // add JWT token as default auth header
        $http.defaults.headers.common['Authorization'] = 'Bearer ' + $window.jwtToken;
 
        // update active tab on state change
        $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
            $rootScope.activeTab = toState.data.activeTab;
        });
    }

    /*
    // manually bootstrap angular after the JWT token is retrieved from the server
    $(function () {
        // get JWT token from server
        $.get('/app/token', function (token) {
            window.jwtToken = token;
 
            angular.bootstrap(document, ['app']);
        });
    });*/