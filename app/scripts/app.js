'use strict';

/**
 * @ngdoc overview
 * @name coffeeshotsApp
 * @description
 * # coffeeshotsApp
 *
 * Main module of the application.
 */
angular
  .module('coffeeshotsApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'btford.socket-io',
    'ngDialog',
    'leaflet-directive',
    'ngCordova'
  ])
  
  .run(function($rootScope, $route, API, $location){
    

    var hello = window.hello;
    hello.init({
      facebook: '1686745721565298',
    }, {redirect_uri: 'http://localhost:9000/'});

    hello.on('auth.login', function(auth) {
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
    });
    
     

    $rootScope.$on('$routeChangeSuccess', function(){
      if(!$rootScope.currentUser){
          var currentPath = $location.path();
          if(currentPath !== '/'){
            $location.path('/login');
          }

      }
      if ($route.current.$$route.hideBar && $route.current.$$route.hideBar === true){
        $rootScope.hideBar = true;
      } else {
        $rootScope.hideBar = false;
      }
    });
  })
  .config(function ($routeProvider, $logProvider) {
    // stop leafletJS debug output
    $logProvider.debugEnabled(false);
    $routeProvider
      .when('/', {
        templateUrl: 'views/launch.html',
        controller: 'LaunchCtrl',
        controllerAs: 'launch',
        hideBar: true
        
      })
      
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl',
        controllerAs: 'login',
        hideBar: true
      })
      .when('/drink', {
        templateUrl: 'views/drink.html',
        controller: 'DrinkCtrl',
        controllerAs: 'drink',
       
      })
      .when('/me', {
        templateUrl: 'views/me.html',
        controller: 'MeCtrl',
        controllerAs: 'me',
        
      })
      .when('/serve', {
        templateUrl: 'views/serve.html',
        controller: 'ServeCtrl',
        controllerAs: 'serve',
        
      })
      .when('/welcome', {
        templateUrl: 'views/welcome.html',
        controller: 'WelcomeCtrl',
        controllerAs: 'welcome',
        hideBar: true
        
      })
      .otherwise({
        redirectTo: '/'
      });
  });
