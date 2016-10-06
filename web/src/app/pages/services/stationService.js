(function () {
  'use strict';

  angular.module('BlurAdmin.common.services')
    .service('StationService',stationService);


    function stationService($http) {

      return {
        getStationsbyRestaurant : function(id_restaurant, callback) {
          var data = {};
          $http.get(api.url + '/stations/restaurant/' + id_restaurant, data).then(
              function(result) {
                callback(result.data.Stations);
              },
              function(error) {
                console.log(error);
                callback(error);
              }
            );
        },

        getMessagesByLabel : function(label){
          return messages.filter(function(m){
            return m.labels.indexOf(label) != -1;
          });
        }
      }
    }

})();