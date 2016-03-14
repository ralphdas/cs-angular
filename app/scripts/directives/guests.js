'use strict';

/**
 * @ngdoc directive
 * @name coffeeshotsApp.directive:guests
 * @description
 * # guests
 */
angular.module('coffeeshotsApp')
  .directive('guests', function () {
    return {
      templateUrl: 'views/guests.html',
      restrict: 'C',
      link: function postLink(scope, element, attrs) {
       		attrs.$observe('guestsSrc', function(){
       			scope.$watch(attrs.guestsSrc, function(_value){
       				scope.guests = _value;
       			});
       		});
          
            
              

          scope.showDrinksDialog = function(_user){
             scope.$emit('add_drinks_dialog', _user);
          }
      }
    };
  });
