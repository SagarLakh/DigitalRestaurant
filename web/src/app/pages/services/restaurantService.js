(function () {
  'use strict';

  angular.module('BlurAdmin.common.services')
    .service('RestaurantService',restaurantService);


    function restaurantService($http) {

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

        getMessagesByLabel : function(label){
          return messages.filter(function(m){
            return m.labels.indexOf(label) != -1;
          });
        }
      }
    }

})();
