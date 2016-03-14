'use strict';

/**
 * @ngdoc function
 * @name coffeeshotsApp.controller:DialogsCtrl
 * @description
 * # DialogsCtrl
 * Controller of the coffeeshotsApp
 */
angular.module('coffeeshotsApp')
  .controller('DialogsCtrl', function ($scope, ngDialog, $rootScope) {
   		$scope.$on('open_details_dialog', function(event, data){
    		var newScope = $scope.$new();
    		newScope.user = data;
    		var detailsPopup = ngDialog.open({
    			templateUrl: 'views/shooter_detail_popup.html',
    			scope: newScope,
    			className: 'default-dialog'
    		});
    	});	

        $scope.$on('edit_bio_dialog', function(event, data){
            var newScope = $scope.$new();
            newScope.bio = $rootScope.currentUser.bio;
            
            var bioPopup = ngDialog.open({
                templateUrl: 'views/bio_dialog.html',
                scope: newScope,
                className: 'default-dialog'
            });

            bioPopup.closePromise.then(function(data){
                if(data.value  && data.value !== '$document'){
                    $rootScope.currentUser.bio = data.value;    
                }
            });
        }); 


        $scope.$on('show_machine_dialog', function(event, data){
            var newScope = $scope.$new();
            newScope.machine = $rootScope.currentUser.shooter.machine;
            

            var machinePopup = ngDialog.open({
                templateUrl: 'views/machine_dialog.html',
                scope: newScope,
                className: 'default-dialog'
            });

            machinePopup.closePromise.then(function(data){
               
                if(data.value && data.value !== '$document'){
                    $rootScope.currentUser.shooter.machine = data.value;    
                }
            });
        }); 

    	$scope.$on('accept_invite_dialog', function(event, data){
    		var newScope = $scope.$new();
    		newScope.user = data;
    		var detailsPopup = ngDialog.open({
    			templateUrl: 'views/accept_invite_dialog.html',
    			scope: newScope,
    			className: 'default-dialog'
    		});
    	});	
    	$scope.$on('add_drinks_dialog', function(event, data){
    		var newScope = $scope.$new();
    		newScope.user = data;
    		var detailsPopup = ngDialog.open({
    			templateUrl: 'views/add_drinks_dialog.html',
    			scope: newScope,
    			className: 'default-dialog'
    		});
    	});	
  });
