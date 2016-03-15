'use strict';

/**
 * @ngdoc function
 * @name coffeeshotsApp.controller:DialogsCtrl
 * @description
 * # DialogsCtrl
 * Controller of the coffeeshotsApp
 */
 angular.module('coffeeshotsApp')
 .controller('DialogsCtrl', function ($scope, ngDialog, $rootScope, Geocode) {

        // Open the Shooter Details
        $scope.$on('open_details_dialog', function(event, data){
        	var newScope = $scope.$new();
        	newScope.user = data;
        	var detailsPopup = ngDialog.open({
        		templateUrl: 'views/shooter_detail_popup.html',
        		scope: newScope,
        		className: 'default-dialog'
        	});
        });	

        // Edit the user biography
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

        // Edit the shooter machine
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
        

        // Edit the address details of a shooter
        $scope.$on('show_address_dialog', function(event, data){
        	var newScope = $scope.$new();
        	newScope.address = $scope.currentUser.shooter.address;
        	console.log(newScope);
        	var addressPopup = ngDialog.open({
        		templateUrl: 'views/address_dialog.html',
        		scope: newScope,
        		className: 'default-dialog'
        	});
        	addressPopup.closePromise.then(function(data){

        		if(data.value && data.value !== '$document'){


        			var addressString = data.value.street+' '+data.value.postal_code+' '+data.value.city;

        			Geocode.geocode(addressString, function(_geoResults){
                        // safely assume the first is the right one
                        var geo = {
                        	lat: _geoResults[0].geometry.location.lat(),
                        	lng: _geoResults[0].geometry.location.lng()
                        }
                        
                        // Set this in the API
                        console.log(data.value);
                        $rootScope.currentUser.shooter.address.street = data.value.street;
                        $rootScope.currentUser.shooter.address.city = data.value.city;
                        $rootScope.currentUser.shooter.address.postal_code = data.value.postal_code;
                        
                        $rootScope.currentUser.shooter.address.geo = geo;

                    });

        		}
        	});
        }); 

        // shooter change time dialog
        $scope.$on('show_time_dialog', function(event, data){

        	var timePopup = ngDialog.open({
        		templateUrl: 'views/time_picker_dialog.html',

        		className: 'default-dialog'
        	});

        	timePopup.closePromise.then(function(data){

        		if(data.value && data.value !== '$document'){
        			var hours = new Date(data.value).getHours();
        			var minutes = new Date(data.value).getMinutes();
        			var seconds = new Date(data.value).getSeconds();
        			var desired_time = new Date().setHours(hours);
        			desired_time = new Date(desired_time).setMinutes(minutes);


        			$rootScope.currentUser.shooter.openUntill = desired_time / 1000;

        		}
        	});
        });  

        // change description dialog
        $scope.$on('show_description_dialog', function(event, data){
        	var newScope = $scope.$new();
        	newScope.description = $rootScope.currentUser.shooter.description;
        	var descriptionPopup = ngDialog.open({
        		templateUrl: 'views/description_dialog.html',
        		scope: newScope,
        		className: 'default-dialog'
        	});
        	descriptionPopup.closePromise.then(function(data){
        		
        		if(data.value && data.value !== '$document'){
        			$rootScope.currentUser.shooter.description = data.value;


        		}
        	});
        });	

        // accept a guest invitation
        $scope.$on('accept_invite_dialog', function(event, data){
        	var newScope = $scope.$new();
        	newScope.user = data;
        	var detailsPopup = ngDialog.open({
        		templateUrl: 'views/accept_invite_dialog.html',
        		scope: newScope,
        		className: 'default-dialog'
        	});
        });	

        // drinks overview dialog 
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
