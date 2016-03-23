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
        delete window.localStorage.welcome_shown;
        $rootScope.block_login = false;
        if(window.localStorage){
            delete window.localStorage.loginData;
        }
        $location.path('/');
     }
     
     $scope.showDialog = function(_type){
    	
    	if(_type == 'bio'){
    		$scope.$emit('edit_bio_dialog');
    	}
    	
    	
    }
     
  });
