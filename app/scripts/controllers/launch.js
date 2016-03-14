'use strict';

/**
 * @ngdoc function
 * @name coffeeshotsApp.controller:LaunchCtrl
 * @description
 * # LaunchCtrl
 * Controller of the coffeeshotsApp
 */
angular.module('coffeeshotsApp')
  .controller('LaunchCtrl', function (API, $rootScope, $location, $timeout) {
    
    
    $timeout(function(){
        API.rememberme();
        
    }, 500);

    $rootScope.$on('user.resume', function(data){
    	console.log(data);
    	// should go to welcome
    	$location.path('/drink');
    });

    $rootScope.$on('user.deauthenticated', function(){
    	// should go to welcome
    	$location.path('/login');
    });

  });
