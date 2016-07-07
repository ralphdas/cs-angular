'use strict';

/**
 * @ngdoc function
 * @name coffeeshotsApp.controller:MeCtrl
 * @description
 * # MeCtrl
 * Controller of the coffeeshotsApp
 */
angular.module('coffeeshotsApp')
  .controller('MeCtrl', function ($scope, API, $rootScope, $location) {


     $scope.logoutUser = function(){
        if($rootScope.currentUser.shooter.is_serving){
           window.alert('Please your serving session before logging out.');
           return;
        }
        destroyCredentialsAndReload();
     }
     
     $scope.$watch('currentUser.shooter.account', function(accountObj){
         console.log(typeof(accountObj));
         if(typeof(accountObj) === 'object'){
             $scope.account_info_present = true;
         } else {
             $scope.account_info_present = false;
         }
     });

     $scope.removeUser = function(){
        var user_confirmed = window.confirm('Are you sure you want to permanently delete you account?');
        if(!user_confirmed){
            return;
        }
        if($rootScope.currentUser.shooter.is_serving){
           window.alert('Please your serving session before removing your account.');
           return;
        }
        API.removeUser($rootScope.currentUser._id, function(){
             destroyCredentialsAndReload();
        });
     }

     function destroyCredentialsAndReload(){
        delete window.localStorage.welcome_shown;
        $rootScope.block_login = false;
        delete $rootScope.currentUser;
        if(window.localStorage){
            delete window.localStorage.loginData;
            delete window.localStorage.hello;
        }
        window.location.reload(true);
     }
     
     $scope.showDialog = function(_type){
    	
    	if(_type == 'bio'){
    		$scope.$emit('edit_bio_dialog');
    	}
        if(_type == 'bank'){
    		$scope.$emit('show_bank_details_dialog');
    	}
        
    	
    	
    }
     
  });
