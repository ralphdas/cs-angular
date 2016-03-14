'use strict';

/**
 * @ngdoc directive
 * @name coffeeshotsApp.directive:navTabs
 * @description
 * # navTabs
 */
angular.module('coffeeshotsApp')
  .directive('navTabs', function () {
    return {
     
      restrict: 'AC',
      link: function(scope, element, attrs){
          
          if(attrs.flipped){
            scope.flipped = true;
          } else {
            scope.flipped = false;
          }
      },
      controller: function($scope, $rootScope, $timeout){
        var tabs = [];
        
        $scope.registerTab = function(_value, _default){
        
          if(tabs.indexOf(_value) === -1){
            tabs.push(_value);
          }
          if(_default === true){
            $scope.selectedTab = _value;
          }
          $timeout(function(){
            if(typeof($scope.selectedTab) === 'undefined'){
               $scope.selectedTab = tabs[tabs.length -1];
            }
          }, 500);
         
        }
            
        $scope.selectTab = function(_value){
          
          $scope.selectedTab = _value;
          $rootScope.$broadcast('navTabs.select', [{selectedTab:_value}]);
        }
      } 
      
    };
  });
