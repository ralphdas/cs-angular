'use strict';

/**
 * @ngdoc function
 * @name coffeeshotsApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the coffeeshotsApp
 */
angular.module('coffeeshotsApp')
  .controller('LoginCtrl', function ($scope, API, ngDialog, $rootScope, $location) {
    var currentUserId;
    this.facebookLogin = function(){
        var options ={
            'display':'page',
            'scope':'email',
        }
        hello('facebook').login(options);
    }

        
        

    hello.on('auth.login', function(auth) {
        hello('facebook').api('/me').then(function(_user) {
            var end_user = {
                firstname : _user.first_name,
                lastname : _user.last_name,
                image :  _user.thumbnail+'?type=large',
                email : _user.email
            }
          
            API.sendFacebookLogin(end_user);
                
            
        });
    });

    this.registerUser = function(){
    	API.register($scope.registerInput);
        
    }
    this.loginUser = function(){
        API.login($scope.loginInput);
    }


    $rootScope.$on('user.authenticated', function(event, data){
        
        console.log(data);
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
       



        
  });
