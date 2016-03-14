'use strict';

/**
 * @ngdoc directive
 * @name coffeeshotsApp.directive:meIcon
 * @description
 * # meIcon
 */
angular.module('coffeeshotsApp')
  .directive('meIcon', function ($rootScope, $location) {
    return {
      templateUrl: 'views/nav_me_icon.html',
      restrict: 'AC',
      scope: {},
      link: function postLink(scope, element, attrs) {
        $rootScope.$on('$routeChangeSuccess', function(){
          if($location.path() === '/me'){
            scope.active = true;
          } else {
            scope.active = false;
          }
        })
          
          
        angular.element(element).on('click', function(){
           scope.$apply(function(){
              $location.path('/me'); 
           });
        });
      }
    };
  });
