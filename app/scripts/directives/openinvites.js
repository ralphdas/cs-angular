'use strict';

/**
 * @ngdoc directive
 * @name coffeeshotsApp.directive:openInvites
 * @description
 * # openInvites
 */
angular.module('coffeeshotsApp')
  .directive('openInvites', function () {
    return {
      templateUrl: 'views/open_invites.html',
      restrict: 'AC',
      link: function postLink(scope, element, attrs) {
       		attrs.$observe('invites', function(){
       			scope.$watch(attrs.invites, function(_value){
       				scope.invites = _value;
       			});
       		});

          scope.showAcceptDialog = function(_user){
            scope.$emit('accept_invite_dialog', _user);
          }
      }
    };
  });
