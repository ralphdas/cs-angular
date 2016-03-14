'use strict';

/**
 * @ngdoc directive
 * @name coffeeshotsApp.directive:serveIcon
 * @description
 * # serveIcon
 */
angular.module('coffeeshotsApp')
  .directive('serveIcon', function ($rootScope, $location) {
    return {
      templateUrl: 'views/nav_serve_icon.html',
      restrict: 'AC',
      scope: {},
      link: function postLink(scope, element, attrs) {
        $rootScope.$on('$routeChangeSuccess', function(){
          if($location.path() === '/serve'){
            scope.active = true;
          } else {
            scope.active = false;
          }
        })
          
          
        angular.element(element).on('click', function(){
           scope.$apply(function(){
              $location.path('/serve'); 
           });
        });



          
          
              
              
          
      }
    };
  });
