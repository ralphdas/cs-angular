'use strict';

/**
 * @ngdoc service
 * @name coffeeshotsApp.geocode
 * @description
 * # geocode
 * Factory in the coffeeshotsApp.
 */
angular.module('coffeeshotsApp')
  .factory('Geocode', function ($http) {
    // Service logic
    // ...

   

    // Public API here
    return {
      geocode: function (_address, _cb) {
        /*
        var geocoder = new google.maps.Geocoder();
        geocoder.geocode( { "address": _address}, function(results, status) {
            if (status == google.maps.GeocoderStatus.OK && results.length > 0) {
                _cb(results);
            } else {
              cb(false;);
            }
        });

        */
        var url = "http://nominatim.openstreetmap.org/search.php?q="+encodeURIComponent(_address)+"&format=json&json_callback=JSON_CALLBACK";
        var callback = _cb;
            console.log(url);
        $http.jsonp(url).success(function(_results){
            console.log(_results);
            if(_results.length === 0){
              callback(false);
              return;
            }
            var returnArr = [
              {
                geometry: {
                  location:{
                    lat: function(){
                      return Number(_results[0].lat); 
                    },
                    lng: function(){
                      return Number(_results[0].lon); 
                    }
                  }
                }

                
              }
            ];
            callback(returnArr);
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
