'use strict';

/**
 * @ngdoc directive
 * @name coffeeshotsApp.directive:alertsPopover
 * @description
 * # alertsPopover
 */
angular.module('coffeeshotsApp')
  .directive('alertsPopover', function ($rootScope) {
    return {
      templateUrl: 'views/alerts_popover.html',
      restrict: 'AC',
      controller: function($scope, API, $location){
      	API.getAlerts($rootScope.currentUser.id);
      	setInterval(function(){
      		API.getAlerts($rootScope.currentUser.id);
      	}, 10000);
      	$scope.$on('user.alerts', function(event, data){
      		$scope.alerts = data;
      	});

        $scope.selectAlert = function(_alert){
          
          if(_alert.action === 'PAYMENT_REQUESTED'){
            // we need to show the payPal popup
            
            $scope.$emit('show_paypal_dialog', $.extend(_alert.sender, _alert.details));
          }
          if(_alert.action === 'PAYMENT_RECEIVED'){
            $location.path('/me');
          }
          if(_alert.action === 'PAYMENT_DENIED'){
            $location.path('/me');
          }
          if(_alert.action === 'INVITE_REQUESTED'){
             $scope.$emit('accept_invite_dialog', _alert.sender);
          }
          if(_alert.action === 'INVITE_ACCEPTED'){
             // TODO
             $scope.$emit('invite_accepted_dialog', _alert.sender);
          }
          if(_alert.action === 'RATING_REQUESTED'){
             // TODO
             $scope.$emit('rate_shooter_dialog', _alert.sender);
          }
          if(_alert.action === 'RATING_RECEIVED'){
            $location.path('/me');
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
