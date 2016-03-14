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
  
  .run(function($rootScope, $route, API){
    $rootScope.$on('user.me_reply', function(event, _userDetails){
        $rootScope.$apply(function(){
            $rootScope.currentUser = _userDetails;
            
        });

     });
    API.getCurrrentUser();


    $rootScope.$on('$routeChangeSuccess', function(){
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
