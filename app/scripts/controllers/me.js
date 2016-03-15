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
        $location.path('/login');
     }
     
     $scope.showDialog = function(_type){
    	
    	if(_type == 'bio'){
    		$scope.$emit('edit_bio_dialog');
    	}
    	
    	
    }
     
  });
