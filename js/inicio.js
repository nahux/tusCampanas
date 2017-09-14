//App
var app = angular.module('testangular', ['ui.router']);

//Controller
app.controller('testangularCtrl', function($scope) {

});

//Config States
app.config(function($stateProvider){
	//Estado inicio
	var inicioState = {
		name: 'inicio',
		url: '/inicio',
		template: '<h3> Inicio </h3>'
	}
	//Estado about
	var aboutState = {
		name: 'about',
		url: '/about',
		template: '<h3> Acerca de </h3>'
	}

	//Registro los states
	$stateProvider.state(inicioState);
	$stateProvider.state(aboutState);
});