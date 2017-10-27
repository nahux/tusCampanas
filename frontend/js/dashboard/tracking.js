//Factory para RESOURCE
angular.module('app').factory('EntryTrackings', function($resource) {
	return $resource('/api/trackings/:id',{'id' : '@id'}, {
			'query': { method: 'GET', isArray: true},
			'update': { method: 'PUT' },
			'save': { method: 'POST' },
			'remove': { method:'DELETE' }
		});
});

//Service
angular
	.module('app')
	.service("TrackingService", ["$q", "$timeout", "CampanasService", "EntryTrackings", function($q, $timeout, CampanasService, EntryTrackings) {

		this.getTrackings = function() {
			var deferred = $q.defer();
			
			var trackingsTraidos = EntryTrackings.query(function(){
				deferred.resolve(trackingsTraidos);
			});

			return deferred.promise;  
		}

		this.getTracking = function(idCamp) {
			var deferred = $q.defer();
			
			var trackingTraido = EntryTrackings.get({id:idCamp},function(){
				deferred.resolve(trackingTraido);
			});

			return deferred.promise;  
		}

		this.addTracking = function(campana) {
			var deferred = $q.defer();
			
			var tracking = {};
			//Nich Richtig
			tracking.id_campana = campana.id;
			tracking.title = campana.title;
			tracking.sent = 0;
			tracking.opened = 0;
			tracking.errors = 0;
			
			var trackingNuevo = EntryTrackings.save(tracking,function(){
				deferred.resolve(trackingNuevo);
			});

			return deferred.promise;
		}

}]);

//Component
angular
	.module('app')
	.component('tracking', {
		templateUrl: 'dashboard/tracking.html'
});

//Controller
angular
	.module('app')
	.controller('TrackingController', ["$scope","TrackingService","CampanasService", function($scope,TrackingService,CampanasService) {
		$scope.refreshTrackings = function() {
			TrackingService.getTrackings().then(function(trackings) {
				$scope.trackings = trackings;
			});  
		}
		$scope.refreshTrackings();	
}]);


///////////////////
//Detalle

//Component
angular
	.module('app')
	.component('trackingDetalle', {
		templateUrl: 'dashboard/tracking_detalle.html'
});

//Controller
angular
	.module('app')
	.controller('TrackingDetalleController', ["$scope","TrackingService", "$state", "$stateParams", function($scope,TrackingService, $state, $stateParams) {
		$scope.refreshTracking = function() {
			TrackingService.getTracking($stateParams.id).then(function(tracking) {
				$scope.tracking = tracking;
				$scope.canvas(tracking);
			});
		}
		$scope.canvas = function(tracking) {
			var popCanvas = $("#popChart");
			var barChart = new Chart(popCanvas, {
				type: 'bar',
				data: {
					labels: ["Enviados", "Abiertos", "Errores"],
					datasets: [{
						label: 'Cantidad',
						data: [tracking.sent, tracking.opened , tracking.errors],
						backgroundColor: [
							'rgba(60, 142, 255, 1)',
							'rgba(0, 128, 0, 1)',
							'rgba(255, 0, 0, 1)'
						]
					}]
				},
				responsive: true,
				maintainAspectRatio: false
			});
		}
		$scope.refreshTracking();	
}]);