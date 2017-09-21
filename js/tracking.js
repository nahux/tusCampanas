//Service
angular
	.module('inicio')
	.service("TrackingService", ["$q", "$timeout", "CampanasService", function($q, $timeout, CampanasService) {
		var trackings = 
			[{
				id: 1,
				id_campana: 2,
				title: "Europa 21 días",
				sent: 35,
				opened: 5,
				errors: 2

			},
			{
				id: 2,
				id_campana: 3,
				title: "Camboya 5 días",
				sent: 160,
				opened: 12,
				errors: 4

			}];

		this.getTrackings = function() {
			var deferred = $q.defer();
			
			$timeout(function() {
				deferred.resolve(trackings);
			}, 1000);
			return deferred.promise;  
		}

		this.getTracking = function(idCamp) {
			var deferred = $q.defer();
			
			//Averiguar porqué no anda con promise
			$timeout(function() {
				deferred.resolve(trackings.find(x => x.id_campana == idCamp));
			}, 500);
			return deferred.promise;  
		}

}]);

//Component
angular
	.module('inicio')
	.component('tracking', {
		templateUrl: 'dashboard/tracking.html'
});

//Controller
angular
	.module('inicio')
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
	.module('inicio')
	.component('trackingDetalle', {
		templateUrl: 'dashboard/tracking_detalle.html'
});

//Controller
angular
	.module('inicio')
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