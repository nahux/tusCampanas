//Config States
angular
	.module('inicio')
	.config(routesConfig);

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
				component: 'compCamp',
			});

			$stateProvider
			.state('dashboard.campanas.detalle', {
				url: '/:id', 
				views: 
					{
						'detalleCampana': {
							templateUrl: 'partial-campana.html',
						}
					}
			});

		//Estados Grupos
		$stateProvider
			.state('dashboard.grupos', {
				url: '/grupos',
				component: 'compGrupos',
		});

		$stateProvider
			.state('dashboard.grupos.detalle', { 
				url: '/:id', 
				views: 
					{
						'detalleGrupo': {
							templateUrl: 'partial-grupo.html',
						}
					},
		});
}