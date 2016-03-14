'use strict';

/**
 * @ngdoc filter
 * @name coffeeshotsApp.filter:timeAgo
 * @function
 * @description
 * # timeAgo
 * Filter in the coffeeshotsApp.
 */
angular.module('coffeeshotsApp')
  .filter('timeAgo', function () {
    return function (input) {
      	input *= 1000;
     	var now = new Date().getTime();
     	var target = new Date(input).getTime();
     	var msPassed = now - target;
     	var secPassed = Math.floor(msPassed / 1000);
     	var returnValue = '';
     	
     	if(secPassed > 86400){
     		returnValue  = Math.floor(secPassed / 86400)+' days ago'
     	}
     	if(secPassed > 3600 && secPassed < 86400){
     		returnValue  = Math.floor(secPassed / 3600)+' hours ago'
     	}
     	if(secPassed > 60 && secPassed < 3600){
     		returnValue  = Math.floor(secPassed / 60)+' minutes ago'
     	}
     	if(secPassed < 60){
     		returnValue = 'less then a minute ago';
     	}
     	return returnValue;
    };
  });
