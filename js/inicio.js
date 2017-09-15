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
	//Estados inivcio
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
		template: '	<div class="input-group"> ' +
						'<h1>Tus Campañas</h1>' +
						'<div class="input-group">'+
						'	<input type="text" class="form-control" placeholder="Campañas...">'+
						'	<span class="input-group-btn">'+
						'		<button class="btn btn-default" type="button">Buscar!</button>'+
						'	</span>' +
						'</div><br>'+
						'<div class="list-group"> ' +
						'	<button type="button" class="list-group-item"> México 3 días</button> ' +
						'	<button type="button" class="list-group-item"> Córdiba 1 semana</button> ' +
						'	<button type="button" class="list-group-item"> Crucero Miami</button> ' +
						'</div>' +
						'<button class="btn btn-default" type="button">Nueva</button>  '+
					'</div>'
		/*templateUrl: 'partial-campanas.html'*/
	}

	var gruposState = {
		name: 'grupos',
		url: '/grupos',
		template:   '<div class="input-group"> ' +
						'<h1>Tus Grupos</h1>' +
						'<div class="input-group">'+
						'	<input type="text" class="form-control" placeholder="Grupos...">'+
						'	<span class="input-group-btn">'+
						'		<button class="btn btn-default" type="button">Buscar!</button>'+ 
						'	</span>'+
						'</div><br>'+
						'<div class="list-group"> ' +
						'	<button type="button" class="list-group-item">Adultos La Plata</button> ' +
						'	<button type="button" class="list-group-item">Colegas</button> ' +
						'	<button type="button" class="list-group-item">Padres</button> ' +
						'</div>' +
					'</div>'
		/*templateUrl: 'partial-grupos.html'*/
	}
	
	//Registro los states
	$stateProvider.state(campanasState);
	$stateProvider.state(gruposState);
	////////////////////
});