'use strict';

/**
 * @ngdoc directive
 * @name coffeeshotsApp.directive:drinkIcon
 * @description
 * # drinkIcon
 */
angular.module('coffeeshotsApp')
  .directive('drinkIcon', function ($rootScope, $location) {
    return {
      templateUrl: 'views/nav_drink_icon.html',
      restrict: 'AC',
      scope: {},
      link: function postLink(scope, element, attrs) {
        $rootScope.$on('$routeChangeSuccess', function(){
          if($location.path() === '/drink'){
            scope.active = true;
          } else {
            scope.active = false;
          }
        })
          
          
        angular.element(element).on('click', function(){
           scope.$apply(function(){
              $location.path('/drink'); 
           });
        });
      }
    };
  });
