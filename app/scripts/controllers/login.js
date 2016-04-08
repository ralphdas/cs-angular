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
     var url = 'https://www.facebook.com/dialog/oauth?client_id=1686745721565298&response_type=token&redirect_uri=http://coffeeshots.servebeer.com&scope=public_profile,email';
     var target = '_blank';

     var ref = cordova.InAppBrowser.open(url, target, 'clearcache=yes');
     
     function myCallBackHandler(event){
        console.log(event);
     }
     function getUrlValues(_url) {
          var params = _url.split('?');
          var values = {}
          if (params.length > 1) {
            params = params[1];
            var pairs = params.split('&');
            for (var i = 0; i < pairs.length; i++) {
              var _key = pairs[i].split('=')[0];
              var _value = pairs[i].split('=')[1];
              values[_key] = _value;
            };
            return values;
          } else {
            return false;
          }

    }

     function onLoadStop(event){
        var url = event.url;
        
        var values = getUrlValues(url);
        if (values === false){
            console.log('no values found');
            return;
        }
        if(values['#access_token'] && values['expires_in']){
            createLocalStorage(values['#access_token'], Number(values['expires_in']));
            ref.close();
        }

     }

     function createLocalStorage(_access_token, _expires_in){
        var auth_obj = {};
        auth_obj.facebook = {
            "state": "",
            "access_token": _access_token,
            "expires_in": _expires_in,
            "https": "1",
            "client_id": "1686745721565298",
            "network": "facebook",
            "display": "none",
            "redirect_uri": "http://coffeeshots.servebeer.com/",
            "scope": "basic",
            "expires": ((Math.floor(new Date().getTime()/ 1000)) + _expires_in)

        };
        if(window.localStorage){
            window.localStorage.hello = JSON.stringify(auth_obj);
        }
     }

     ref.addEventListener('loadstart', myCallBackHandler);
     ref.addEventListener('loadstop', onLoadStop);
     ref.addEventListener('loaderror', myCallBackHandler);
     ref.addEventListener('exit', myCallBackHandler);

     

   }







    this.registerUser = function(){
        $scope.showSpinner = true;
        
         
        API.register($scope.registerInput, function(_currentUser){
            $rootScope.$emit('user.authenticated', _currentUser);
            if(window.localStorage){
                window.localStorage.loginData = JSON.stringify($scope.registerInput);
            }
            
        });

    }
    this.loginUser = function(){
        $scope.showSpinner = true;
        
        
        API.login($scope.loginInput, function(_currentUser){
            console.log('fired!');
            console.log(_currentUser);
            $rootScope.$emit('user.authenticated', _currentUser);
            if(window.localStorage){
                window.localStorage.loginData = JSON.stringify($scope.loginInput);
            }
           
        });
    }


    
        
       



    





});
