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

        delete : function(id_station, callback) {
          var data = {};
          $http.delete(api.url + '/stations/' + id_station, data).then(
              function(result) {
                callback(result.data.Stations);
              },
              function(error) {
                console.log(error);
                callback(error);
              }
            );
        },

        getDishesbyStation : function(i, id_station, callback) {
          var data = {};
          $http.get(api.url + '/stations/' + id_station + '/dishes', data).then(
              function(result) {
                var result_var = {
                  ndishes : result.data.Dishes.length,
                  i: i
                };
                callback(result_var);
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