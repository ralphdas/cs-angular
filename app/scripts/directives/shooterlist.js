'use strict';

/**
 * @ngdoc directive
 * @name coffeeshotsApp.directive:shooterList
 * @description
 * # shooterList
 */
angular.module('coffeeshotsApp')
  .directive('shooterList', function () {
    return {
      templateUrl: 'views/shooter_list.html',
      restrict: 'AC',
      link: function postLink(scope, element, attrs) {
       		scope.selectShooter = function(shooter){
       			scope.$emit('open_details_dialog', shooter);
       		}
      }
    };
  });
