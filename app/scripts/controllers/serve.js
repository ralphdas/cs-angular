'use strict';

/**
 * @ngdoc function
 * @name coffeeshotsApp.controller:ServeCtrl
 * @description
 * # ServeCtrl
 * Controller of the coffeeshotsApp
 */
angular.module('coffeeshotsApp')
  .controller('ServeCtrl', function ($scope, API, ngDialog) {
    $scope.$on('user.me_reply', function(event, _userDetails){
     	$scope.$apply(function(){
     		$scope.currentUser = _userDetails;
     	});
     });
    // TODO move to dialogs controller
    $scope.showDialog = function(_type){
    	var templateUrl;
    	if(_type == 'address'){
    		//templateUrl = 'views/address_dialog.html'; 
        $scope.$emit('show_address_dialog');
        return;
    	}
    	if(_type == 'time'){
    		templateUrl = 'views/time_picker_dialog.html'; 
    	}
      if(_type == 'machine'){
        $scope.$emit('show_machine_dialog');
        return;
      }
    	if(_type == 'description'){
    		templateUrl = 'views/description_dialog.html'; 
    	}
    	
    }

     API.getCurrrentUser();
  });
