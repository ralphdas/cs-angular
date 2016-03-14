'use strict';

/**
 * @ngdoc function
 * @name coffeeshotsApp.controller:WelcomeCtrl
 * @description
 * # WelcomeCtrl
 * Controller of the coffeeshotsApp
 */
angular.module('coffeeshotsApp')
  .controller('WelcomeCtrl', function ($location) {
    this.continue = function(){
    	$location.path('/drink');
    }
  });
