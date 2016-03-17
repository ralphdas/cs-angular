'use strict';

/**
 * @ngdoc function
 * @name coffeeshotsApp.controller:DialogsCtrl
 * @description
 * # DialogsCtrl
 * Controller of the coffeeshotsApp
 */
 angular.module('coffeeshotsApp')
 .controller('DialogsCtrl', function ($scope, ngDialog, $rootScope, Geocode, API, $timeout) {

        // Open the Shooter Details
        $scope.$on('open_details_dialog', function(event, data){
        	var newScope = $scope.$new();
        	newScope.user = data;
        	var detailsPopup = ngDialog.open({
        		templateUrl: 'views/shooter_detail_popup.html',
        		scope: newScope,
        		className: 'default-dialog'
        	});
            detailsPopup.closePromise.then(function(data){
                console.log(data);
                if(data.value  && data.value !== '$document'){
                    console.log(data.value);
                    API.requestVisit($rootScope.currentUser.id, data.value);
                    var requestedShooter = $rootScope.shooters.find(function(shooter){
                        return shooter.id === data.value;
                    });
                    requestedShooter.visitRequested = true;
                }
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
                    API.changeBio($rootScope.currentUser.id, data.value);  
        		}
        	});
        }); 


        // Edit the user biography
        $scope.$on('show_paypal_dialog', function(event, data){
            var newScope = $scope.$new();
            newScope.details = data;

            var _paypalDetails = data;
            

            var paymentPopup = ngDialog.open({
                templateUrl: 'views/paypal_dialog.html',
                scope: newScope,
                className: 'default-dialog paypal-dialog'
            });

            paymentPopup.closePromise.then(function(data){
                if(data.value === '$document'){
                   return;
                }
                if(data.value === false){
                    // denied
                    API.denyPayment($rootScope.currentUser.id, _paypalDetails.payment_id);
                }
                if(data.value === true){
                    // acccepted
                    var description = _paypalDetails.cups+' cups of coffee with '+_paypalDetails.firstname+' '+_paypalDetails.lastname+' using the Coffee Shots App';
                    var paymentDetails = new PayPalPaymentDetails(String(_paypalDetails.amount), "0.00", "0.00");
                    var payment = new PayPalPayment(String(_paypalDetails.amount), "EURO", description, "", paymentDetails);
                    window.PayPalMobile.renderSinglePaymentUI(payment, function success(_result){
                       console.log('payment succeeded!');
                       console.log(_result);

                       API.acceptPayment($rootScope.currentUser.id, _paypalDetails.payment_id);
                    }, function failed(_result){
                        console.log('payment failed :-(  ');
                        console.log(_result);
                    }); 
                    
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

        // Invite accepted
        $scope.$on('invite_accepted_dialog', function(event, data){
            var newScope = $scope.$new();
            newScope.user = data;
            var acceptDialog = ngDialog.open({
                templateUrl: 'views/invite_accepted_dialog.html',
                scope: newScope,
                className: 'default-dialog'
            });
            acceptDialog.closePromise.then(function(data){
                if(data.value === '$document'){
                    // dismiss the popup not making desicion
                    return;
                }
                
            });
        }); 

        // accept a guest invitation
        $scope.$on('accept_invite_dialog', function(event, data){
        	var newScope = $scope.$new();
        	newScope.user = data;
        	var acceptDialog = ngDialog.open({
        		templateUrl: 'views/accept_invite_dialog.html',
        		scope: newScope,
        		className: 'default-dialog'
        	});
            acceptDialog.closePromise.then(function(data){
                if(data.value === '$document'){
                    // dismiss the popup not making desicion
                    return;
                }
                if(data.value.accepted === false){
                    API.denyInvite($rootScope.currentUser.id, data.value.guest_id);
                    // need to remove user from the invite list
                    $rootScope.currentUser.shooter.open_invites.forEach(function(candidate, index){
                        if(candidate.id === data.value.guest_id){
                            $rootScope.currentUser.shooter.open_invites.splice(index, 1);
                        }
                    });
                }
                 if(data.value.accepted === true){
                    API.acceptInvite($rootScope.currentUser.id, data.value.guest_id);
                    // need to move him to the guest list
                    var _item;
                    $rootScope.currentUser.shooter.open_invites.forEach(function(candidate, index){
                        if(candidate.id === data.value.guest_id){
                            _item = $rootScope.currentUser.shooter.open_invites.splice(index, 1)[0];
                        }
                    });
                    _item.drinking_costs = 0;
                    _item.cups_drunk = 0;
                    _item.status = 0;
                    $rootScope.currentUser.shooter.guests.unshift(_item);
                }
            });
        });	

        // drinks overview dialog 
        $scope.$on('add_drinks_dialog', function(event, data){
        	var newScope = $scope.$new();
        	newScope.user = data;
            newScope.user.newOrderAmount = 0;
            newScope.increaseOrder = function(){
                newScope.user.newOrderAmount += .5;
            }
            newScope.decreaseOrder = function(){
                if( newScope.user.newOrderAmount > 0){
                newScope.user.newOrderAmount -= .5;

                }
            }
            newScope.addCup = function(){
                newScope.user.cups_drunk += 1;
                
                newScope.user.drinking_costs += newScope.user.newOrderAmount;
                newScope.user.newOrderAmount = 0;
            }
            newScope.requestPayment = function(){
                var payment_id = window.UUID.generate();
                
                API.requestPayment($rootScope.currentUser.id, newScope.user.id, payment_id,  newScope.user.drinking_costs, newScope.user.cups_drunk);
                $timeout(function(){
                    newScope.user.status = 1;
                    
                });
                
                $rootScope.currentUser.shooter.guests.forEach(function(guest){
                    if(guest.id === newScope.user.id){
                        guest.status = newScope.user.status;
                        guest.payment_id = payment_id;
                    }
                }); 
                


            }

            newScope.resetUser = function(){
                newScope.user.cups_drunk = 0;
                newScope.user.drinking_costs = 0;

            }
        	var drinksDialog = ngDialog.open({
        		templateUrl: 'views/add_drinks_dialog.html',
        		scope: newScope,
        		className: 'default-dialog add-drinks-dialog'
        	});
            drinksDialog.closePromise.then(function(data){
                console.log(data);
                if(data.value.action=== 'left'){
                    $rootScope.currentUser.shooter.guests.forEach(function(guest, index){
                    if(guest.id === data.value.id){
                         $rootScope.currentUser.shooter.guests.splice(index, 1);
                    }
                }); 
                }
            });
        });	
    });
