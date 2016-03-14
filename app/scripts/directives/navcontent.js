'use strict';

/**
 * @ngdoc directive
 * @name coffeeshotsApp.directive:navContent
 * @description
 * # navContent
 */
angular.module('coffeeshotsApp')
  .directive('navContent', function () {
    return {
    
      restrict: 'AC',
      controller: function($scope, $rootScope){
      	var tabs = [];
      	$scope.registerTab = function(_value){
      		if(tabs.indexOf(_value) === -1){
            	tabs.push(_value);
          	}
      	}
      	$rootScope.$on('navTabs.select', function(data){
      		
      		if(typeof(data.selectedTab) === 'undefined'){
      			return;
      		}
      		if(tabs.indexOf(data.selectedTab) !== -1){
      			$scope.selectedTab = data.selectedTab;
      		}
      	});

          	
      }
    };
  });
