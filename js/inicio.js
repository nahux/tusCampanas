//App
var app = angular.module('inicio', ['ui.router']);

//Controller
app.controller('inicioCtrl', function($scope) {

});

app.controller('loginCtrl', function($scope) {
	$scope.validateLogin = function(user) {
		//Validar login
	}
});


//Componentes Inicio
angular.module('inicio').component('compAbout', {
	template:  '<h3>¡Bienvenido a {{$ctrl.titulo}}!</h3>' +
			 '<p> {{$ctrl.mensaje}} </p>',
			 
	controller: function() {
	this.titulo = 'TusCampañas';
	this.mensaje = 'En Tus campañas usted puede promocionar sus productos o servicios de una manera eficiente y fácil de usar.';
	}
})


//Config States
app.config(function($stateProvider){
	//Estados inicio
	var inicioState = {
		name: 'inicio',
		url: '/inicio',
		template: '<h3> Inicio </h3>'
	}

	var aboutState = {
		name: 'about',
		url: '/about',
		component: 'compAbout'
	}
	//Registro los states
	$stateProvider.state(inicioState);
	$stateProvider.state(aboutState);
	////////////////////

	//Estados dashboard
	var campanasState = {
		name: 'campanas',
		url: '/campanas',
		component: 'compCamp',
		resolve: {
			campanas: function(CampanasService) {
				return CampanasService.getCampanas();
			}
		}
	}

	var campanaState = {
		name: 'campanas.detalle', 
		url: '/:id', 
		views: {
						'detalleCampana': {
								templateUrl: 'partial-campana.html',
							}
						},
	}

	var gruposState = {
		name: 'grupos',
		url: '/grupos',
		component: 'compGrupos',
		resolve: {
			grupos: function(GruposService) {
				return GruposService.getGrupos();
			}
		}
	}
	var grupoState = {
		name: 'grupos.detalle', 
		url: '/:id', 
		views: {
						'detalleGrupo': {
								templateUrl: 'partial-grupo.html',
							}
						},
	}
	
	//Registro los states
	$stateProvider.state(campanasState);
	$stateProvider.state(campanaState);
	$stateProvider.state(gruposState);
	$stateProvider.state(grupoState);
	////////////////////
});