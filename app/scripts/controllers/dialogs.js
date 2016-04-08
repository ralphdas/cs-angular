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
                    API.requestVisit($rootScope.currentUser._id, data.value);
                    var requestedShooter = $rootScope.shooters.find(function(shooter){
                        return shooter._id === data.value;
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
        	   
                if((data.value || data.value === '')  && data.value !== '$document'){
                    $rootScope.currentUser.bio = data.value;  
                    API.changeBio($rootScope.currentUser._id, data.value);  
        		}
        	});
        }); 


        // Edit the user biography
        $scope.$on('show_paypal_dialog', function(event, data){
            var newScope = $scope.$new();
            console.log(data);
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
                    API.denyPayment($rootScope.currentUser._id, _paypalDetails.sender_id, _paypalDetails.amount,  _paypalDetails.payment_id);
                }
                if(data.value === true){
                    // acccepted
                    
                    var payment;

                    var clientIDs = {
                       "PayPalEnvironmentProduction": "YOUR_PRODUCTION_CLIENT_ID",
                       "PayPalEnvironmentSandbox": "AQDVZoXBDDFPjgDmPxtqTpr3JM2Y60Q1TAEPQ1ItsQmJJjYyKtKA-qNuRtPZgblYhfW4-txbX1F27lZr"
                     };


                     PayPalMobile.init(clientIDs, function(){

                        var configObj = new PayPalConfiguration({
                            merchantName: "Coffee Shots", 
                            merchantPrivacyPolicyURL: "http://www.coffeeshots.nl/privacy-policy", 
                            merchantUserAgreementURL: "http://www.coffeeshots.nl/algemene-voorwaarden"
                        });

                        PayPalMobile.prepareToRender("PayPalEnvironmentSandbox", configObj, function(){
                            var description = _paypalDetails.cups+' cups at '+_paypalDetails.firstname+' '+_paypalDetails.lastname+' using the Coffee Shots App';
                            var paymentDetails = new PayPalPaymentDetails(String(_paypalDetails.amount), "0.00", "0.00");
                            payment = new PayPalPayment(String(_paypalDetails.amount), "EUR", description, "SALE", paymentDetails);
                        

                     
                            window.PayPalMobile.renderSinglePaymentUI(payment, function success(_result){
                               console.log('payment succeeded!');
                               console.log(_result);

                               API.acceptPayment($rootScope.currentUser._id, _paypalDetails.sender_id, _paypalDetails.amount, _paypalDetails.cups, _paypalDetails.payment_id);
                            }, function failed(_result){
                                console.log('payment failed :-(  ');
                                console.log(_result);
                            });
                        });






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

        		if((data.value || data.value === '') && data.value !== '$document'){
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


        			var addressString = data.value.street+' '+data.value.city;

        			Geocode.geocode(addressString, function(_geoResults){
                        // safely assume the first is the right one
                        // 
                        console.log(_geoResults);

                        var _street = data.value.street;
                        var _city = data.value.city;
                        var _postal_code = data.value.postal_code;
                        if(_geoResults){
                            var geo = {
                                lat: _geoResults[0].geometry.location.lat(),
                                lng: _geoResults[0].geometry.location.lng()
                            }
                            
                            // Set this in the API
                            $timeout(function(){
                                $rootScope.currentUser.shooter.address.street = _street;
                                $rootScope.currentUser.shooter.address.city = _city;
                                $rootScope.currentUser.shooter.address.postal_code = _postal_code;
                                $rootScope.currentUser.shooter.address.geo = geo;
                                $rootScope.currentUser.shooter.address.geo_point = [geo.lat, geo.lng];

                            });
                            
                        } else {
                            window.alert('Oops! Address not found!');
                            $rootScope.currentUser.shooter.address.street = '';
                            $rootScope.currentUser.shooter.address.city = '';
                            $rootScope.currentUser.shooter.address.postal_code = '';

                        }
                        

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


        			$rootScope.currentUser.shooter.open_until = desired_time / 1000;

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
        		
        		if((data.value || data.value === '') && data.value !== '$document'){
        			$rootScope.currentUser.shooter.description = data.value;


        		}
        	});
        });	

        // Rate Shooter Dialog
        $scope.$on('rate_shooter_dialog', function(event, data){
            var newScope = $scope.$new();
            newScope.user = data;
            newScope.rating = 1;
            newScope.stars = [
                { selected:true },
                { selected:false },
                { selected:false },
                { selected:false },
                { selected:false },
            ];

            newScope.rate = function(_rate){
                newScope.rating = _rate;
                for (var i = 0; i < newScope.stars.length; i++) {
                    if(i <= _rate-1){
                        newScope.stars[i].selected = true;
                    } else {
                        newScope.stars[i].selected = false;

                    }
                };
            }
            var rateDialog = ngDialog.open({
                templateUrl: 'views/rate_shooter_dialog.html',
                scope: newScope,
                className: 'default-dialog'
            });
            rateDialog.closePromise.then(function(data){
                if(data.value === '$document'){
                    // dismiss the popup not making desicion
                    return;
                }
                if(data.value){
                    API.submitRating($rootScope.currentUser._id, data.value.host_id, data.value.rating, data.value.description);
                }
                
            });
        }); 


        // Invite accepted
        $scope.$on('invite_accepted_dialog', function(event, data){
            var newScope = $scope.$new();
            newScope.user = data;
            newScope.openInGoogleMaps = function(){
                var url = 'http://maps.google.com/?q='+newScope.user.shooter.address.street+'%20'+newScope.user.shooter.address.city;
                window.open(url, '_system');
            }
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
                    API.denyInvite($rootScope.currentUser._id, data.value.guest_id);
                    
                }
                 if(data.value.accepted === true){
                    console.log($rootScope.currentUser._id);
                    console.log(data);
                    API.acceptInvite($rootScope.currentUser._id, data.value.guest_id);
                
                }
                $timeout(function(){
                    $scope.$emit('user.get_updates'); 
                }, 500);
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
                
                
                API.changeOrder($rootScope.currentUser._id, newScope.user.user_id, (newScope.user.drinking_costs + newScope.user.newOrderAmount), (newScope.user.cups_drunk +1), function(_guest){
                    newScope.user = _guest;
                    newScope.user.newOrderAmount = 0;
                });
            }
            newScope.requestPayment = function(){
                
                
                API.requestPayment($rootScope.currentUser._id, newScope.user.user_id, newScope.user.payment_id,  newScope.user.drinking_costs, newScope.user.cups_drunk, function(_guest){
                     newScope.user = _guest;
                });
                
                
                
                


            }

            newScope.resetUser = function(){
                 API.changeOrder($rootScope.currentUser._id, newScope.user.user_id, 0, 0, function(_guest){
                    newScope.user = _guest;
                    newScope.user.newOrderAmount = 0;
                });

            }
        	var drinksDialog = ngDialog.open({
        		templateUrl: 'views/add_drinks_dialog.html',
        		scope: newScope,
        		className: 'default-dialog add-drinks-dialog'
        	});
            drinksDialog.closePromise.then(function(data){
                console.log(data);
                if(typeof(data.value) === 'undefined' || data.value === null){
                    return;
                }
                if(data.value.action=== 'left'){
                    API.clearGuest($rootScope.currentUser._id, data.value.id);

                    $rootScope.currentUser.shooter.guests.forEach(function(guest, index){
                    if(guest.id === data.value.id){
                         $rootScope.currentUser.shooter.guests.splice(index, 1);
                    }
                }); 
                }
            });
        });	
    });
