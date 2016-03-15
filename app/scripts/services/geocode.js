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
      },
      getAddressComponent: function(address, component, type) {
        var element = null;
        angular.forEach(address.address_components, function (address_component) {
          if (address_component.types[0] == component) {
            element = (type == 'short') ? address_component.short_name : address_component.long_name;
          }
        });

        return element;
      }


    };
  });
