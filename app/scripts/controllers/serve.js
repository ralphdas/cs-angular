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
    		templateUrl = 'views/address_dialog.html'; 
    	}
    	if(_type == 'time'){
    		templateUrl = 'views/time_picker_dialog.html'; 
    	}
    	if(_type == 'description'){
    		templateUrl = 'views/description_dialog.html'; 
    	}
    	var dialog = ngDialog.open({
    		template: templateUrl,
    		className: 'default-dialog'
    	});
    }

     API.getCurrrentUser();
  });
