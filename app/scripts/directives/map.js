'use strict';

/**
 * @ngdoc directive
 * @name coffeeshotsApp.directive:map
 * @description
 * # map
 */
 angular.module('coffeeshotsApp')
 .directive('map', function () {
 	return {
 		
 		restrict: 'AC',
 		controller: function ($scope, $rootScope, API, IPtoGeo, Geocode, $timeout, $cordovaGeolocation) {
 			var accessTokenMapBox = 'pk.eyJ1IjoicmFscGhkYXMiLCJhIjoiT0ZUTXZqRSJ9.xNuIp977fBIZciLU967q5A';
 			var mapBoxMapId = 'ralphdas.77660109';
 			var shooters = [];
 			var currentPosMarker;
 			$scope.markers = [];
 			
 			function onShooters(data){
 				shooters = data;
 				$scope.markers = createMarkers(data);
 				if(currentPosMarker){
 					$scope.markers.push(currentPosMarker);
 				}
 				$rootScope.shooters = data;
 			}

 			$scope.geoLocateMe = function(){
 				var posOptions = {timeout: 10000, enableHighAccuracy: false};
 				$cordovaGeolocation .getCurrentPosition(posOptions).then(
 					function (position) {
 						var lat  = position.coords.latitude;
 						var long = position.coords.longitude;

 						
 						$scope.centerPoint =  {
 							lat: lat,
 							lng: long,
 							zoom: 14
 						}

 						for (var i = 0; i < $scope.markers.length; i++) {
 							if($scope.markers[i].shooterId === 999999){
 								$scope.markers.splice(i, 1);
 							}
 						}
 						currentPosMarker = createCurrentPosMarker(lat, long);
 						$scope.markers.push(currentPosMarker);

 						

 					}, function(err) {
			      // error
			      window.alert('Oops! Could not determine geolocation. Please try again later...');
			  });
 			}

 			var typeDebounce;
 			$scope.onAddressInput = function(){
 				if(typeDebounce){
 					clearTimeout(typeDebounce);
 				}
 				typeDebounce = setTimeout(function(){
 					Geocode.geocode($scope.addressInput, function(_places){
 						
 						
 						$scope.centerPoint =  {
 							lat: _places[0].geometry.location.lat(),
 							lng: _places[0].geometry.location.lng(),
 							zoom: 14
 						}
 						


 						
 					});

 				}, 1000);
 				
 			}

 			IPtoGeo.retrieve(function(data){
 				
 				$scope.centerPoint = {
 					lat: data.lat,
 					lng: data.lon,
 					zoom: 14
 				}
 				$scope.$parent.latitude = data.lat;
 				$scope.$parent.longitude = data.lon;

 				API.getShooters({
	 				lat: data.lat,
	 				lng: data.lon,
	 				radius: 1000
	 			}, onShooters);
	 			setInterval(function(){
	 				API.getShooters({
	 					lat: $scope.centerPoint.lat,
	 					lng: $scope.centerPoint.lng,
	 					radius: 1000
	 				}, onShooters);
	 			}, 15000);
 				
 			});

 			

 			$scope.$on('leafletDirectiveMarker.click', function(event, data){
 				console.log(data.model.shooterId);
 				if(data.model.shooterId === 999999){
 					return;

 				}
 				var selectedShooter = shooters[data.model.shooterId];
 				$scope.$emit('open_details_dialog', selectedShooter);

 			});
 			
 			function createCurrentPosMarker(_lat, _lng){
 				var marker = {
 					lat: _lat,
 					lng: _lng,
 					focus: true,
 					
 					draggable: false,
 					shooterId: 999999,
 					icon: {
 						type: 'div',
 						className: 'marker-current-pos',
 						iconSize: null,
 						html: '<div></div>'

 					}
 					
 				}
 				return marker;
 			}

 			

 			function createMarkers(data){
 				var markers = [];
 				for (var i = 0; i < data.length; i++) {
 					markers.push(
 					{
 						lat: data[i].shooter.address.geo.lat,
 						lng: data[i].shooter.address.geo.lng,
 						focus: true,
 						
 						draggable: false,
 						shooterId: i,
 						icon: {
 							type: 'div',
 							className: 'marker-default',
 							iconSize: null,

 							html: '<img class=\'map-icon\' src='+data[i].image+'></img>'
 						}
 						
 					}
 					)
 				}
 				return markers;

 			}
 			
 			
 			angular.extend($scope, {
 				events: {
 					marker: {
 						enable: ['click'],
 						logic: 'emit'
 					}
 				},
 				centerPoint: {
 					lat: 52.3702160,
 					lng: 4.8951680,
 					zoom: 5
 				},
 				defaults: {
 					tileLayer: 'https://api.mapbox.com/v4/'+mapBoxMapId+'/{z}/{x}/{y}.png?access_token=' + accessTokenMapBox,
 					tileLayerOptions: {
 						detectRetina: true,
 						reuseTiles: true,
 						subdomains: 'abc',

 					},
 					zoomControl: false
 					

 				}});
 		}
 	};
 });
