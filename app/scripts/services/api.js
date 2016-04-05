'use strict';

/**
 * @ngdoc service
 * @name coffeeshotsApp.API
 * @description
 * # API
 * Factory in the coffeeshotsApp.
 */
angular.module('coffeeshotsApp')
  .factory('API', function (socketFactory, $cookies, $rootScope, $location) {
    // Service logic
    // ...
    window.socket = socketFactory({ ioSocket: window.io.connect('http://130.255.75.69:3000') });
   

    socket.on('user.deauthenticated', function(){
      $rootScope.$broadcast('user.deauthenticated', []);
    });

    
    // User sucessfully logged in or registered
    socket.on('user.authenticated', function(_userId){
      $rootScope.$broadcast('user.authenticated', _userId);
    });
      
    // response to user.get_shooters
    socket.on('user.shooters_around', function(_shooterData){
      $rootScope.$broadcast('user.shooters_around', _shooterData);
    });
    
    
      
     


     

      
      



    socket.on('user.alerts', function(_alerts){
      $rootScope.$broadcast('user.alerts', _alerts);
    });
     

      







    // Public API here
    return {
      login: function (userdata, cb) {
        console.log(userdata);
        socket.emit('user.login', userdata, function(err, data){
          if(err){
            window.alert(err.error);
            if(window.localStorage){
              delete window.localStorage.loginData;
              window.location.reload(true);
            }
            $location.path('/');
          } else {
            console.log(data);
            cb(data);
            
          }
        }); 
      },
      rememberme: function(){
        var rememberMeToken = $cookies['remember-me'] || undefined;
        socket.emit('user.rememberme', {cookie: rememberMeToken});
      },
      register: function(userdata, cb){
        socket.emit('user.register', userdata, function(err, data){
          if(err){
            window.alert(err.error);
            $location.path('/');
          } else {
            cb(data);
            
          }
        }); 
      },
      getUserDetails: function(_id){
        socket.emit('user.get_details', _id, function(_userDetails){
          $rootScope.$broadcast('user.detail_reply', _userDetails);
        });
      },
      getShooters: function(geoData, cb){
        socket.emit('user.get_shooters', geoData, cb);
      },
      getCurrrentUser: function(_userId, cb){
        socket.emit('user.get_details', _userId, cb);
      },
      getAlerts: function(_userId){
        socket.emit('user.get_alerts', {'id':_userId }, function(_alerts){
          $rootScope.$broadcast('user.alerts', _alerts);
        });
      },
      requestVisit: function(_userId, _userIdHost){
        socket.emit('user.request_visit', {'id': _userId, 'user_id_host':_userIdHost}, function(){

        });
      },
      changeBio: function(_userId, _bio){
         socket.emit('user.change_bio', {'id': _userId, 'bio':_bio});
      },
      startServing: function(_shooterData, cb){
         socket.emit('user.start_serving', _shooterData, cb);
      },
      stopServing: function(_userId, cb){
         console.log(_userId);
         socket.emit('user.stop_serving', _userId, cb);
      },
      acceptInvite: function(_userId, _guestUserId){
         
         console.log('shooter.accept_invite');
         console.log({'id': String(_userId), 'user_id_guest':String(_guestUserId)});
         socket.emit('shooter.accept_invite', {'id': _userId, 'user_id_guest':_guestUserId}, function(){
            console.log('done');
             $rootScope.$emit('get_updates');
         });
      },
      changeOrder: function(_userId, _guestUserId, _amount, _cups, cb){
          
          socket.emit('shooter.change_order', {
              host_id: _userId,
              guest_id: _guestUserId,
              amount: _amount,
              cups: _cups
          }, function(_guest){
            cb(_guest);
          });

      },
      denyInvite: function(_userId, _guestUserId, cb){
         console.log('guest_user_id: '+_guestUserId);
         console.log('user_id: '+_userId);
         socket.emit('shooter.deny_invite', {'id': _userId, 'user_id_guest':_guestUserId}, function(){
             $rootScope.$emit('get_updates');
         });
      },
      acceptPayment: function(_userId, _hostUserId, _amount, _cups, _paymentId){
         socket.emit('user.accept_payment', {'id': _userId, 'host_id':_hostUserId, 'amount':_amount, 'cups':_cups, 'payment_id':_paymentId}, function(){
             $rootScope.$emit('get_updates');
         });
      },
      denyPayment: function(_userId, _hostUserId, _amount, _paymentId){
         socket.emit('user.deny_payment', {'id': _userId, 'host_id':_hostUserId, 'amount':_amount, 'payment_id':_paymentId}, function(){
            $rootScope.$emit('get_updates');
         });
      },
      requestPayment: function(_userId, _guestUserId, _payment_id, _amount, _cups, cb){
         console.log('guest_user_id: '+_guestUserId);
         console.log('user_id: '+_userId);
         socket.emit('shooter.request_payment', {'id': _userId, 'user_id_guest':_guestUserId, 'payment_id':_payment_id, 'amount':_amount, 'cups':_cups}, function(_guest){
            cb(_guest);
         });
      },
      clearGuest: function(_userId, _guestUserId){
         socket.emit('shooter.clear_guest', {'id': _userId, 'user_id_guest':_guestUserId}, function(){
            $rootScope.$emit('get_updates');
         });
      },
      submitRating: function(_userId, _userIdHost, _rating, _description){
         socket.emit('user.submit_rating', {'id': _userId, 'host_id': _userIdHost, 'stars':_rating, 'description':_description}, function(){
            $rootScope.$emit('get_updates');
         });
      }

      






    };
  });
