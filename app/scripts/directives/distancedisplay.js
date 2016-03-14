'use strict';

/**
 * @ngdoc directive
 * @name coffeeshotsApp.directive:distanceDisplay
 * @description
 * # distanceDisplay
 */
angular.module('coffeeshotsApp')
  .directive('distanceDisplay', function ($rootScope) {
    return {
      templateUrl: 'views/distance_display.html',
      restrict: 'AC',
      scope: {},
      link: function postLink(scope, element, attrs) {
          if(typeof($rootScope.settings) == 'undefined'){
       			$rootScope.settings = {};
       		}
          $rootScope.settings.distanceDisplay = 'KM';
          scope.selectValue = function(_value){
           		if(_value == 'MILES'){
           			$rootScope.settings.distanceDisplay = 'MILES';
           		}
           		if(_value == 'KM'){
           			$rootScope.settings.distanceDisplay = 'KM';
           		}
          }
      }
    };
  });
