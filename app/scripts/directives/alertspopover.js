'use strict';

/**
 * @ngdoc directive
 * @name coffeeshotsApp.directive:alertsPopover
 * @description
 * # alertsPopover
 */
angular.module('coffeeshotsApp')
  .directive('alertsPopover', function () {
    return {
      templateUrl: 'views/alerts_popover.html',
      restrict: 'AC',
      controller: function($scope, API){
      	API.getAlerts();
      	setInterval(function(){
      		API.getAlerts();
      	}, 10000);
      	$scope.$on('user.alerts', function(event, data){
      		$scope.alerts = data;
      	});
      },
      link: function postLink(scope, element, attrs) {
       		scope.isVisible = false;
       		function togglePopover(){
       			scope.$apply(function(){
       				scope.isVisible = !scope.isVisible;
       			});
       			
       		}
       		$(element).on('click', togglePopover);
       		
       		

      }
    };
  });
