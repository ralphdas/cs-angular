'use strict';

/**
 * @ngdoc filter
 * @name coffeeshotsApp.filter:timeRemaining
 * @function
 * @description
 * # timeRemaining
 * Filter in the coffeeshotsApp.
 */
angular.module('coffeeshotsApp')
  .filter('timeRemaining', function () {
    return function (input) {
     	input *= 1000;
     	var now = new Date().getTime();
     	var target = new Date(input).getTime();
     	var msRemaining = target - now;
     	var secRemaining = Math.floor(msRemaining / 1000);
     	var returnValue = '';
     	
     	if(secRemaining > 86400){
     		returnValue  = Math.floor(secRemaining / 86400)+' days'
     	}
     	if(secRemaining > 3600 && secRemaining < 86400){
     		var hours = Math.floor(secRemaining / 3600);
            var min = Math.floor((secRemaining - (hours * 3600))/ 60);
            returnValue  = hours+' hours and '+min+' min.' 
     	}
     	if(secRemaining > 60 && secRemaining < 3600){
     		returnValue  = Math.floor(secRemaining / 60)+' minutes'
     	}
     	if(secRemaining < 60){
     		returnValue = 'less then a minute';
     	}
     	return returnValue;


    };
  });
