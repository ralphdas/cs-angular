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
    
    // TODO move to dialogs controller
    $scope.showDialog = function(_type){
    	var templateUrl;
    	if(_type == 'address'){
    		//templateUrl = 'views/address_dialog.html'; 
        $scope.$emit('show_address_dialog');
        return;
    	}
    	if(_type == 'time'){
    		//TODO templateUrl = 'views/time_picker_dialog.html'; 
        $scope.$emit('show_time_dialog');
        return;
    	}
      if(_type == 'machine'){
        $scope.$emit('show_machine_dialog');
        return;
      }
    	if(_type == 'description'){
    		//TODO templateUrl = 'views/description_dialog.html'; 
        $scope.$emit('show_description_dialog');
        return;
    	}
    	
    }

     
  });
