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
    
    
   

    
   if(window.localStorage && window.localStorage.loginData && typeof(window.localStorage.loginData) !== 'undefined'){
        
   		var loginData = JSON.parse(window.localStorage.loginData);
      API.login(loginData);

   } else {
        $timeout(function(){
            $location.path('/login');

        }, 1000);
   }

  });
