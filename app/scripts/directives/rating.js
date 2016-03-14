'use strict';

/**
 * @ngdoc directive
 * @name coffeeshotsApp.directive:rating
 * @description
 * # rating
 */
angular.module('coffeeshotsApp')
  .directive('rating', function () {
    return {
      templateUrl: 'views/star_rating.html',
      restrict: 'C',
      scope: {},
      link: function postLink($scope, element, attrs) {
        
        $scope.stars = [];
        console.log(attrs);
        if(attrs.white && attrs.white === "true"){
          $scope.white = true;
        } else {
           $scope.white = false;
        }
        
        for (var i = 0; i < 5; i++) {
        	if(i < attrs.ratingValue){
        		$scope.stars.push({selected: true});
        	} else {
        		$scope.stars.push({selected: false});
        	}	
        };
      }
    };
  });
