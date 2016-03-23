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
    
    //$timeout(function(){
        init();
   // }, 3000);
    function init(){
        if(!angular.isDefined($rootScope.currentUser.shooter.isShooting)){
             $rootScope.currentUser.shooter.isShooting = false;
        }
        if($rootScope.currentUser.shooter.openUntill > now){
            $rootScope.currentUser.shooter.isShooting = true;
        } else {
            $rootScope.currentUser.shooter.isShooting = false;
        }
        
    }
    
    function checkAddress(_addressObj){
        var correct = true;
        for(var value in _addressObj){
            if(_addressObj[value] === ('' || undefined || null)){
                correct = false;
            }
        }
        return correct;
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

        var endTime = $rootScope.currentUser.shooter.openUntill;
        var address =  $rootScope.currentUser.shooter.address;
        var formattingCorrect = Boolean(checkTime(endTime) && checkAddress(address));
        var shooterObj = $rootScope.currentUser.shooter;
        if(!formattingCorrect){
            alert('Please set a correct Closing Time and Address.');
            return;
        }
        if($rootScope.currentUser.shooter.isShooting){
            $rootScope.currentUser.shooter.isShooting = false;
            API.stopServing($rootScope.currentUser.id);

        } else {
            $rootScope.currentUser.shooter.isShooting = true;
            API.startServing({
                'id':  $rootScope.currentUser.id,
                'street': shooterObj.address.street,
                'postal_code': shooterObj.address.postal_code,
                'city': shooterObj.address.city, 
                'lat': shooterObj.address.geo.lat,
                'lng': shooterObj.address.geo.lng,
                'open_untill': shooterObj.openUntill,
                'description':  shooterObj.description,
                'machine': shooterObj.machine
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
