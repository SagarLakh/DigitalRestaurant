(function () {
  'use strict';

  angular.module('BlurAdmin.common.services')
    .service('RestaurantService',restaurantService);


    function restaurantService(AdministrationService, $http) {

      return {
        getidRestaurantsbyAdmin : function(id_admin, callback) {
          var data = {};
          $http.get(api.url + '/administrations/admin/' + id_admin, data).then(
              function(result) {
                callback(result.data.ListRestaurants);
              },
              function(error) {
                console.log(error);
                callback(error);
              }
            );
        },

        getRestaurantsbyAdmin : function(id_admin, callback) {
          var data = {};
          $http.get(api.url + '/restaurants/admin/' + id_admin, data).then(
              function(result) {
                callback(result.data.Restaurants);
              },
              function(error) {
                console.log(error);
                callback(error);
              }
            );
        },

        add : function(data, callback) {
          console.log(data);
          var restaurant = data;
          $http.post(api.url + '/restaurants', data).then(
              function(result) {
                var administrationdata = {
                  id_admin : restaurant.id_admin,
                  id_restaurant : result.data.Restaurant.insertId
                };
                console.log(administrationdata);
                AdministrationService.add(administrationdata, function(Restaurant) {
                  callback(result.data.Restaurant);
                });
                
              },
              function(error) {
                console.log(error);
                callback(error);
              }
            );
        },

        edit : function(data, callback) {
          console.log(data);
          $http.put(api.url + '/restaurants', data).then(
              function(result) {
                console.log(result.data.Restaurant);
                callback(result.data.Restaurant);
              },
              function(error) {
                console.log(error);
                callback(error);
              }
            );
        },

        delete : function(id_restaurant, callback) {
          var data = {};
          $http.delete(api.url + '/restaurants/' + id_restaurant , data).then(
              function(result) {
                console.log(result.data.Restaurant);
                callback(result.data.Restaurant);
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
