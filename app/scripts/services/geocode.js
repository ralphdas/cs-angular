'use strict';

/**
 * @ngdoc service
 * @name coffeeshotsApp.geocode
 * @description
 * # geocode
 * Factory in the coffeeshotsApp.
 */
angular.module('coffeeshotsApp')
  .factory('Geocode', function () {
    // Service logic
    // ...

   

    // Public API here
    return {
      geocode: function (_address, _cb) {
        var geocoder = new google.maps.Geocoder();
        geocoder.geocode( { "address": _address}, function(results, status) {
            if (status == google.maps.GeocoderStatus.OK && results.length > 0) {
                _cb(results);
            }
        });
      }
    };
  });
