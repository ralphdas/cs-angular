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

 .run(function($rootScope, $route, API, $location, ngDialog, $timeout, PushService){

 	if(typeof(navigator.notification) !== 'undefined' && navigator.notification !== null){
 		window.alert = navigator.notification.alert;
 		window.confirm = navigator.notification.confirm;
 	}
 	

 	var hello = window.hello;
 	var currentUserId;

 	hello.init({
 		facebook: '1686745721565298',
 	}, {redirect_uri: 'http://coffeeshots.servebeer.com/'});


 	$rootScope.block_login = false;

 	
 	$rootScope.$on('$locationChangeStart', function (event, next, current) {

 		

 		if(next.indexOf('/login') !== -1 && $rootScope.block_login){
 			event.preventDefault();
 			return false; 
 		}
 		var dialogs  = ngDialog.getOpenDialogs();
 		if(dialogs.length > 0){
 			ngDialog.closeAll();
 			event.preventDefault();
 			return false;
 		}

 	});




	// Fastclick implementation
	window.FastClick.attach(document.body);

	// offline
	document.addEventListener("offline", function(){ 
		window.alert("Oops! It seems you are offline. Please Connect to the Internet to use Coffee Shots.") 
	}, false);
	
	hello.on('auth.login', function(auth) {
		hello('facebook').api('/me').then(function(_user) {

			var end_user = {
				firstname : _user.first_name,
				lastname : _user.last_name,
				image :  _user.thumbnail+'?type=large',
				email : _user.email,
				fb_id: _user.id

			}


			API.register(end_user, function(_currentUser){
                 $rootScope.$emit('user.authenticated', _currentUser);
            });




		});
	});
	$rootScope.$on('user.authenticated', function(event, data){
		
		$rootScope.currentUser = data;
		
		var ls = window.localStorage;
		$rootScope.block_login = true;
		


		
		if(window.localStorage.welcome_shown === "true"){

			$location.path('/drink');
		} else {
			$location.path('/welcome');
			$timeout(function(){
				window.localStorage.welcome_shown = "true";
			}, 2000);
			
		}
		PushService.init();


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
