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
      controller: function($scope, $rootScope, $timeout, $location){
        var tabs = [];
        var nav_history = [];
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
        document.addEventListener("backbutton", onBackKeyDown, false);

        function onBackKeyDown(event){
          if(nav_history.length > 0){
            var last_entry_value = nav_history[nav_history.length -1];
            var last_entry_id = nav_history.length -1;
            nav_history.splice(last_entry_id, 1);
            $scope.selectTab(last_entry_value);
            event.preventDefault();
            return false;
          }
        }
            
        $scope.selectTab = function(_value){
          
          $scope.selectedTab = _value;
          nav_history.push(_value);
          $rootScope.$broadcast('navTabs.select', [{selectedTab:_value}]);
        }

      } 
      
    };
  });
