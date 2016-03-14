'use strict';

/**
 * @ngdoc function
 * @name coffeeshotsApp.controller:MeCtrl
 * @description
 * # MeCtrl
 * Controller of the coffeeshotsApp
 */
angular.module('coffeeshotsApp')
  .controller('MeCtrl', function ($scope, API, $rootScope) {
     $scope.$on('user.me_reply', function(event, _userDetails){
     	$scope.$apply(function(){
     		$rootScope.currentUser = _userDetails;
     	});

     });
     $scope.showDialog = function(_type){
    	
    	if(_type == 'bio'){
    		$scope.$emit('edit_bio_dialog');
    	}
    	
    	
    }
     API.getCurrrentUser();
  });
