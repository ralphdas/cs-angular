'use strict';

/**
 * @ngdoc function
 * @name coffeeshotsApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the coffeeshotsApp
 */
 angular.module('coffeeshotsApp')
 .controller('LoginCtrl', function ($scope, API, ngDialog, $rootScope, $location, $timeout) {
    var currentUserId;

    var rememberMeData;

    $scope.showSpinner = true;

    $timeout(function(){
        $scope.showSpinner = false;
    }, 1500);
    $scope.loginInput = {};
    $scope.registerInput = {};

    this.facebookLogin = function(){
        var options ={
            'scope':'email',
        }

        $scope.showSpinner = true;
        hello('facebook').login(options).then(function(_result){
          
            hello('facebook').api('/me').then(function(_user) {
                
                var end_user = {
                    firstname : _user.first_name,
                    lastname : _user.last_name,
                    image :  _user.thumbnail+'?type=large',
                    email : _user.email,
                    fb_id: _user.id

                }
                

                API.register(end_user);

                
            });
        }

        );
    }







    this.registerUser = function(){
        $scope.showSpinner = true;
        if(window.localStorage){
            
            window.localStorage.loginData = JSON.stringify($scope.registerInput);
        }
         
        API.register($scope.registerInput);

    }
    this.loginUser = function(){
        $scope.showSpinner = true;
        
        if(window.localStorage){
           
            window.localStorage.loginData = JSON.stringify($scope.loginInput);
        }
        API.login($scope.loginInput);
    }


    
        
       



    





});
