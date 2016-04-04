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

      controller: function($scope, $rootScope, $timeout){
      	var tabs = [];
      	var top_height = 0;
        $scope.registerTab = function(_value){
      		if(tabs.indexOf(_value) === -1){
            	tabs.push(_value);
          	}
      	}
      	$rootScope.$on('navTabs.select', function(data){
      		/*
          $timeout(function(){
            var nav_height = $('.nav-content li').innerHeight();
            if(nav_height > top_height){
              top_height = nav_height;
            }
            $('.nav-content li').css('height', top_height+'px');  
          }, 1000);
          */

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
