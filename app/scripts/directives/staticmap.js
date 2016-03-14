'use strict';

/**
 * @ngdoc directive
 * @name coffeeshotsApp.directive:staticMap
 * @description
 * # staticMap
 */
angular.module('coffeeshotsApp')
  .directive('staticMap', function () {
    return {
      
      restrict: 'C',
      link: function postLink(scope, element, attrs) {
        
      	attrs.$observe('lng', function(_value){
      		if( attrs.lng === '' || attrs.lat === ''){
      			return;
      		}
      		var accessTokenMapBox = 'pk.eyJ1IjoicmFscGhkYXMiLCJhIjoiT0ZUTXZqRSJ9.xNuIp977fBIZciLU967q5A';
		    var mapId = 'ralphdas.l80mp6gm';
	        var lon = attrs.lng;
	        var lat = attrs.lat;
	        var zoom = 15;
	        var width = 640;
	        var height = 300;
	        var format = 'jpg';
	        var url = 'https://api.mapbox.com/v4/'+mapId+'/'+lon+','+lat+','+zoom+'/'+width+'x'+height+'.'+format+'?access_token='+accessTokenMapBox;
	        
	        $(element).css('background', 'url(\'../images/whiteoverlay.png\'), url(\''+url+'\')');
	        $(element).css('background-size', 'cover');
      	});

        
      }
    };
  });
