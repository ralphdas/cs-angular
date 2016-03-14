'use strict';

/**
 * @ngdoc service
 * @name coffeeshotsApp.IPtoGeo
 * @description
 * # IPtoGeo
 * Factory in the coffeeshotsApp.
 */
angular.module('coffeeshotsApp')
  .factory('IPtoGeo', function ($http) {
    // Service logic
    // ...

    

    // Public API here
    return {
      retrieve: function (cb) {
        var url = 'http://ip-api.com/json?callback=JSON_CALLBACK';
        $http.jsonp(url).success(function(data){
          cb(data);
        });
      }
    };
  });
