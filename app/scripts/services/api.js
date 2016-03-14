'use strict';

/**
 * @ngdoc service
 * @name coffeeshotsApp.API
 * @description
 * # API
 * Factory in the coffeeshotsApp.
 */
angular.module('coffeeshotsApp')
  .factory('API', function (socketFactory, $cookies, $rootScope) {
    // Service logic
    // ...
    var socket = socketFactory({ ioSocket: io.connect('localhost:3000') });


    socket.on('user.deauthenticated', function(){
      $rootScope.$broadcast('user.deauthenticated', []);
    });

    socket.on('user.resume', function(userObject){
      $rootScope.$broadcast('user.resume', [userObject]);
    });

    // User sucessfully logged in or registered
    socket.on('user.authenticated', function(userObject){
      
      $rootScope.currentUser = userObject;
      $rootScope.$broadcast('user.authenticated', [userObject]);
    });
    // response to user.get_shooters
    socket.on('user.shooters_around', function(shooterData){
      $rootScope.$broadcast('user.shooters_around', shooterData);
    });
    socket.on('user.me_reply', function(_userDetails){
      console.log(_userDetails);
      $rootScope.$broadcast('user.me_reply', _userDetails);
    });

    socket.on('user.alerts', function(_alerts){
      $rootScope.$broadcast('user.alerts', _alerts);
    });
     

      







    // Public API here
    return {
      login: function (userdata) {
        socket.emit('user.login', userdata); 
      },
      rememberme: function(){
        var rememberMeToken = $cookies['remember-me'] || undefined;
        socket.emit('user.rememberme', {cookie: rememberMeToken});
      },
      register: function(userdata){
        socket.emit('user.register', userdata); 
      },
      sendFacebookLogin: function(fbdata){
        socket.emit('user.fb_login', fbdata);
      },
      getShooters: function(geoData){
        socket.emit('user.get_shooters', geoData);
      },
      getCurrrentUser: function(){
        socket.emit('user.me');
      },
      getAlerts: function(){
        socket.emit('user.get_alerts');
      }


    };
  });
