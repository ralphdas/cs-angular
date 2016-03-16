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
    var socket = socketFactory({ ioSocket: window.io.connect('localhost:3000') });
   

    socket.on('user.deauthenticated', function(){
      $rootScope.$broadcast('user.deauthenticated', []);
    });

    socket.on('user.resume', function(_userObject){
      $rootScope.$broadcast('user.resume', _userObject);
    });

    // User sucessfully logged in or registered
    socket.on('user.authenticated', function(_userId){
      $rootScope.$broadcast('user.authenticated', _userId);
    });
      
    // response to user.get_shooters
    socket.on('user.shooters_around', function(_shooterData){
      $rootScope.$broadcast('user.shooters_around', _shooterData);
    });
    
    // response to a user detail request
    socket.on('user.detail_reply', function(_userDetails){
        $rootScope.$broadcast('user.detail_reply', _userDetails);
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

      
      getUserDetails: function(_id){
        socket.emit('user.get_details', {id: _id});
      },
      getShooters: function(geoData){
        socket.emit('user.get_shooters', geoData);
      },
      getCurrrentUser: function(_userId){
        socket.emit('user.get_details', {id: _userId});
      },
      getAlerts: function(){
        socket.emit('user.get_alerts');
      },
      requestVisit: function(_userId, _userIdHost){
        socket.emit('user.request_visit', {'id': _userId, 'user_id_host':_userIdHost});
      },
      changeBio: function(_userId, _bio){
         socket.emit('user.change_bio', {'id': _userId, 'bio':_bio});
      },
      startServing: function(_shooterData){
         socket.emit('user.start_serving', _shooterData);
      },
      stopServing: function(_userId){
         socket.emit('user.start_serving', {id: _userId});
      },
      acceptInvite: function(_userId, _guestUserId){
         socket.emit('shooter.accept_invite', {'id': _userId, 'user_id_guest':_guestUserId});
      },
      denyInvite: function(_userId, _guestUserId){
         socket.emit('shooter.deny_invite', {'id': _userId, 'user_id_guest':_guestUserId});
      },
      acceptPayment: function(_userId, _paymentId){
         socket.emit('user.accept_payment', {'id': _userId, 'payment_id':_paymentId});
      },
      denyPayment: function(_userId, _paymentId){
         socket.emit('user.denyPayment', {'id': _userId, 'payment_id':_paymentId});
      },
      requestPayment: function(_userId, _userIdGuest, _amount, _cups){
         socket.emit('shooter.request_payment', {'id': _userId, 'user_id_guest':_userIdGuest, 'amount':_amount, 'cups':_cups});
      },
      clearGuest: function(_userId, _paymentId){
         socket.emit('shooter.clear_guest', {'id': _userId, 'payment_id':_paymentId});
      }






    };
  });
