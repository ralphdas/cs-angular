'use strict';

/**
 * @ngdoc function
 * @name coffeeshotsApp.controller:ServeCtrl
 * @description
 * # ServeCtrl
 * Controller of the coffeeshotsApp
 */
angular.module('coffeeshotsApp')
  .controller('ServeCtrl', function ($scope, API, ngDialog, $rootScope, $timeout) {
    var now = new Date().getTime() / 1000;
    
   

    
    function checkAddress(_addressObj){
        var correct = true;
        for(var value in _addressObj){
            if(_addressObj[value] === ('' || undefined || null)){
                correct = false;
            }
        }
        return correct;
    }


    function init(){
        var endTime = $rootScope.currentUser.shooter.open_until;
        if (!checkTime(endTime)){
            $rootScope.currentUser.shooter.open_until = 0;
        }
        setInterval(function(){
            checkServing();
        }, 1000);

    }
    var unwatch = $rootScope.$watch('currentUser', function(currentUser){
        if(currentUser){
            init();
            checkServing();
            unwatch();
        }
    });
    

    function checkServing(){
        if(typeof($rootScope.currentUser) === 'undefined'){
            return;
        }
        var endTime = $rootScope.currentUser.shooter.open_until;
        var now = Math.floor(new Date().getTime()/ 1000);
       
        if($rootScope.currentUser.shooter.is_serving && now > endTime){
            $scope.toggleServing();
        }
    }

    function checkTime(_time){
         var correct = true;
         var now = new Date().getTime() / 1000;
         if(_time === 0 || _time < now){
            correct = false;
         }
         return correct;
    }
    var lastToggle = 0;


    
    $scope.toggleServing = function(){
        var now = new Date().getTime();

        if((now - lastToggle) < 1000){
            return;
        }

        var endTime = $rootScope.currentUser.shooter.open_until;
        var address =  $rootScope.currentUser.shooter.address;
        var formattingCorrect = Boolean(checkTime(endTime) && checkAddress(address));
        var shooterObj = $rootScope.currentUser.shooter;
        var is_serving = $rootScope.currentUser.shooter.is_serving;
        if(!formattingCorrect && !is_serving){
            window.alert('Please set a correct Closing Time and Address.');
            return;
        }
        if($rootScope.currentUser.shooter.is_serving){
            $rootScope.currentUser.shooter.is_serving = false;
            $rootScope.currentUser.open_until = 0;

            if($rootScope.currentUser.shooter.guests.length){
                for (var i = 0; i < $rootScope.currentUser.shooter.guests.length; i++) {
                    var guest = $rootScope.currentUser.shooter.guests[i];
                    var guest_status = guest.status;
                    var drinking_costs = guest.drinking_costs;
                    var cups = guest.cups;
                    var guest_id = guest.user_id;
                    var payment_id = guest.payment_id;
                    if(guest_status === 0 && drinking_costs > 0){
                        API.requestPayment(rootScope.currentUser._id, guest_id, payment_id, drinking_costs, cups, function(){

                        });
                    }
                };
            }

            API.stopServing({
                '_id':  $rootScope.currentUser._id,
                'shooter': $rootScope.currentUser.shooter
            }, function(err, result){
               
                console.log(result);
                $rootScope.currentUser = result;
               
            });

        } else {
            $rootScope.currentUser.shooter.is_serving = true;
            API.startServing({
                '_id':  $rootScope.currentUser._id,
                'shooter': $rootScope.currentUser.shooter
            }, function(err, result){
                console.log(result);
                $rootScope.currentUser = result;
               
            });
        }
        lastToggle = new Date().getTime();

    }
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
