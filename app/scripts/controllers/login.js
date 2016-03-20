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

    var rememberMeData;
    this.facebookLogin = function(){
        var options ={

            'scope':'email',
        }
        
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
        rememberMeData = $scope.registerInput;
        API.register($scope.registerInput);

    }
    this.loginUser = function(){
        rememberMeData = $scope.loginInput;
        API.login($scope.loginInput);
    }


    $rootScope.$on('user.authenticated', function(event, data){
        if(window.localStorage){
            if(rememberMeData){
                window.localStorage.loginData = JSON.stringify(rememberMeData);

            }
        }
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
