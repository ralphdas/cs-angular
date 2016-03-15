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
            console.log(end_user);
            
        });
    });





    this.registerUser = function(){
    	API.register($scope.registerInput);
        $location.path('/welcome');
    }
    this.loginUser = function(){
        API.login($scope.loginInput);
    }
    $rootScope.$on('user.authenticated', function(){
        $location.path('/welcome');
    });
        
  });
