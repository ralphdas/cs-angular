'use strict';

/**
 * @ngdoc directive
 * @name coffeeshotsApp.directive:timeDisplay
 * @description
 * # timeDisplay
 */
angular.module('coffeeshotsApp')
  .directive('timeDisplay', function ($rootScope) {
    return {
      templateUrl: 'views/time_display.html',
      restrict: 'AC',
      scope: {},
      link: function postLink(scope, element, attrs) {
   		
   		if(typeof($rootScope.settings) == 'undefined'){
   			$rootScope.settings = {};
   		}
   		$rootScope.settings.timeDisplay = '24H';
       	scope.selectValue = function(_value){
       		console.log(_value);
       		if(_value == '24H'){
       			$rootScope.settings.timeDisplay = '24H';
       		}
       		if(_value == '12H'){
       			$rootScope.settings.timeDisplay = '12H';
       		}
       	}
      }
    };
  });
