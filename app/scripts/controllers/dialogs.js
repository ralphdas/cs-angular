'use strict';

/**
 * @ngdoc function
 * @name coffeeshotsApp.controller:DialogsCtrl
 * @description
 * # DialogsCtrl
 * Controller of the coffeeshotsApp
 */
angular.module('coffeeshotsApp')
  .controller('DialogsCtrl', function ($scope, ngDialog) {
   		$scope.$on('open_details_dialog', function(event, data){
    		var newScope = $scope.$new();
    		newScope.user = data;
    		var detailsPopup = ngDialog.open({
    			templateUrl: 'views/shooter_detail_popup.html',
    			scope: newScope,
    			className: 'default-dialog'
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
