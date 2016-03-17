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

        $scope.selectAlert = function(_alert){
          console.log(_alert);
          if(_alert.type = 'PAYMENT_REQUESTED'){
            // we need to show the payPal popup
            $scope.$emit('show_paypal_dialog', $.extend(_alert.sender, _alert.details));
          }
          if(_alert.type = 'PAYMENT_RECEIVED'){
            
          }
          if(_alert.type = 'PAYMENT_RECEIVED'){
            
          }
          if(_alert.type = 'INVITE_REQUESTED'){
            
          }
          if(_alert.type = 'INVITE_ACCEPTED'){
            
          }
          if(_alert.type = 'RATING_REQUESTED'){
            
          }
          if(_alert.type = 'RATING_RECEIVED'){
            
          }

        }

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
