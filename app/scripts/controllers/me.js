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

     $scope.removeUser = function(){
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
    	
    	
    }
     
  });
