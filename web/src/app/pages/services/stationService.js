(function () {
  'use strict';

  angular.module('BlurAdmin.common.services')
    .service('StationService',stationService);


    function stationService($http, ListStationsService) {

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

        add : function(data, callback) {
          
          console.log(data);
          $http.post(api.url + '/stations', data).then(
              function(result) {
                console.log(data);
                console.log(result);
                var id_station = result.data.Station.insertId;
                if (data.allchecked == true) {
                  for (var i = 0; i < data.dishes.length; ++i) {
                    var dish = {
                      id_dish: data.dishes[i].id_dish,
                      id_menu: id_station
                    }
                    ListStationsService.add(dish, function(ListStation) {
                    });
                  }
                }
                else {
                  for (var i = 0; i < data.checked_dishes.length; ++i) {
                    var dish = {
                      id_dish: data.checked_dishes[i],
                      id_station: id_station
                    }
                    console.log(dish);
                    ListStationsService.add(dish, function(ListStation) {
                    });
                  }
                }
                
                
                callback(result.data);
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