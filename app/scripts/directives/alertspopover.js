'use strict';

/**
 * @ngdoc directive
 * @name coffeeshotsApp.directive:alertsPopover
 * @description
 * # alertsPopover
 */
angular.module('coffeeshotsApp')
  .directive('alertsPopover', function ($rootScope, $window) {
    return {
      templateUrl: 'views/alerts_popover.html',
      restrict: 'AC',
      controller: function($scope, API, $location){
      	//API.getAlerts($rootScope.currentUser._id);
      	
        var unwatch = $rootScope.$watch('currentUser', function(newValue){
          if(newValue){
            unwatch();
            getUpdates();
            $window.setInterval(function(){
              getUpdates();
            }, 10000);
          }
        });

            

       

        function getUpdates(){
          console.log('getUpdates');
          if(typeof($rootScope.currentUser) !== 'undefined'){
              API.getAlerts($rootScope.currentUser._id);
              
              API.getCurrrentUser($rootScope.currentUser._id, function(_currentUser){
              
                $rootScope.currentUser.shooter.open_invites = _currentUser.shooter.open_invites;
                $rootScope.currentUser.shooter.guests = _currentUser.shooter.guests;
                $rootScope.currentUser.shooter.reviews = _currentUser.shooter.reviews;
              });
              

          }
          
        }

        
      	$scope.$on('user.alerts', function(event, data){
      		$scope.alerts = data;
      	});
        $rootScope.$on('user.get_updates', function(){
          getUpdates();
        });

        $scope.selectAlert = function(_alert){
          
          if(_alert.action === 'PAYMENT_REQUESTED'){
            // we need to show the payPal popup
            
            console.log(_alert);
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
          if(_alert.action === 'INVITE_DENIED'){
             // TODO
             $scope.$emit('invite_denied_dialog', _alert.sender);
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
