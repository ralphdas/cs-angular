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

    this.activateFacebookPopup = function(){
        // ngDialog should be shown
        var facebookDialog = ngDialog.open({
            template: 'views/fb_login_dialog.html',
            className: 'fb-login-dialog'
        });

        facebookDialog.closePromise.then(function(data){
            API.sendFacebookLogin('');
        });   
    }
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
