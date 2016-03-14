'use strict';

/**
 * @ngdoc function
 * @name coffeeshotsApp.controller:MeCtrl
 * @description
 * # MeCtrl
 * Controller of the coffeeshotsApp
 */
angular.module('coffeeshotsApp')
  .controller('MeCtrl', function ($scope, API) {
     $scope.$on('user.me_reply', function(event, _userDetails){
     	$scope.$apply(function(){
     		$scope.currentUser = _userDetails;
     	});

     });
     API.getCurrrentUser();
  });
