'use strict';

/**
 * @ngdoc filter
 * @name coffeeshotsApp.filter:hourAndMinutes
 * @function
 * @description
 * # hourAndMinutes
 * Filter in the coffeeshotsApp.
 */
angular.module('coffeeshotsApp')
  .filter('hourAndMinutes', function () {
    return function (input) {
      input = input *1000;
      console.log(new Date(input));
      var hours = new Date(input).getHours();
      if(hours < 10){
      	hours = '0'+hours;
      }
      var minutes = new Date(input).getMinutes();
      if(minutes < 10){
      	minutes = '0'+minutes;
      }
      return hours+':'+minutes;
    };
  });
