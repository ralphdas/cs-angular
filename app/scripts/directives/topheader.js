'use strict';

/**
 * @ngdoc directive
 * @name coffeeshotsApp.directive:topHeader
 * @description
 * # topHeader
 */
angular.module('coffeeshotsApp')
  .directive('topheader', function () {
    return {
      templateUrl: 'views/topheader.html',
      restrict: 'AC',
      link: function postLink(scope, element, attrs) {
        
      }
    };
  });
