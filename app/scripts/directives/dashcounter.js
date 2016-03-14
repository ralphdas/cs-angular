'use strict';

/**
 * @ngdoc directive
 * @name coffeeshotsApp.directive:dashCounter
 * @description
 * # dashCounter
 */
angular.module('coffeeshotsApp')
  .directive('dashCounter', function ($timeout, $filter) {
    return {
      templateUrl: 'views/dash_counter.html',
      restrict: 'AC',
      scope: {},
      link: function postLink(scope, element, attrs) {
        
        attrs.$observe('dashValue', function(){
          scope.dashValue = attrs.dashValue;
          scope.dashLabel = attrs.dashLabel;

          if(attrs.dashFormat && attrs.dashFormat == 'currency'){
            scope.dashValue = $filter('currency')(attrs.dashValue, '€');
            scope.smallerText = true;
          }
        });


       
        
        if(attrs.dashSize && attrs.dashSize == 'large'){
          scope.dashSize = attrs.dashSize;
        }
      }
    };
  });
