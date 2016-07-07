    'use strict';
    angular.module('coffeeshotsApp')
    .factory('PushService', function ($cordovaPushV5, API, $cordovaDevice, $rootScope) {
        
        var platform;
        function init(){
            platform = $cordovaDevice.getPlatform().toLowerCase();
            $cordovaPushV5.initialize({
                    android: {
                        senderID: "491364680361"
                    },
                    ios: {
                        alert: "true",
                        badge: "true",
                        sound: "true"
                    }
                }).then(function(){
                        // start listening for new notifications
                        $cordovaPushV5.onNotification();
                        // start listening for errors
                        $cordovaPushV5.onError();
                        
                        $cordovaPushV5.register().then(function(_token) {
                                console.log('register callback triggered');
                                console.log(_token);
                                sendPushRegistrationData(_token);

                        });
                });
        }
        
        $rootScope.$on('push_count_reset', function(){
            if(platform === 'ios'){
                $cordovaPushV5.setBadgeNumber(0);
            }
            
        });

        $rootScope.$on('$cordovaPushV5:notificationReceived', function(event, data){
            var foreground = data.additionalData.foreground || false;
            console.log('Notification received');
            console.log(event);
            console.log(data);
            if(foreground){
                

                navigator.notification.alert(
                    data.message,  // message
                    null,         // callback
                    'Coffee Shots Notification',// title
                    'OK'                  // buttonName
                );
            }
            
        });
        $rootScope.$on('$cordovaPushV5:errorOcurred', function(event, e){
                console.log('Notification Error received');
                console.log(e.message);
            
        });
        

        function sendPushRegistrationData(_token){
            
            var registrationObj = {
                'userId': $rootScope.currentUser._id,
                'token': _token,
                'platform': platform,
            };
            console.log('token = '+_token);
            console.log(registrationObj);
            API.submitRegistrationId(registrationObj);
        }


        return {
            init: function(){
                init();
                
            }
        }
    });