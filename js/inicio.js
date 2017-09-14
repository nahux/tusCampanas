//App
var app = angular.module('inicio', ['ui.router']);

//Controller
app.controller('inicioCtrl', function($scope) {

});


//Componentes
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
		component: 'compAbout'
	}

	//Registro los states
	$stateProvider.state(inicioState);
	$stateProvider.state(aboutState);
});