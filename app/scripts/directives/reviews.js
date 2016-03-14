'use strict';

/**
 * @ngdoc directive
 * @name coffeeshotsApp.directive:reviews
 * @description
 * # reviews
 */
angular.module('coffeeshotsApp')
  .directive('reviews', function () {
    return {
      templateUrl: 'views/reviews.html',
      restrict: 'AC',
      link: function postLink(scope, element, attrs) {
       	attrs.$observe('reviewSource', function(_value){
       		scope.$watch(attrs.reviewSource, function(_value){
       			scope.reviews = _value;
       		});
       		

       	});
      }
    };
  });
