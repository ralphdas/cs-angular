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
    
    var currentUserId;
    $rootScope.$on('user.authenticated', function(event, data){
        currentUserId = data.id;
        API.getUserDetails(currentUserId);
        

    });
    var deregisterListener = $rootScope.$on('user.detail_reply', function(event, data){
       
        if(data.id === currentUserId){
            $rootScope.currentUser = data;

            var ls = window.localStorage;
            if(ls && ls.welcome_shown){
                $location.path('/drink');
            } else {
                $location.path('/welcome');
                ls.welcome_shown = true;
            }
            deregisterListener();
        }
    });

   if(window.localStorage && window.localStorage.loginData && window.localStorage.loginData !== 'undefined'){
        
   		var loginData = JSON.parse(window.localStorage.loginData);
        API.login(loginData);

   } else {
        $timeout(function(){
            $location.path('/login');

        }, 1000);
   }

  });
