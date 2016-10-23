(function () {
  'use strict';

  angular.module('BlurAdmin.common.services')
    .service('TypeDishService',typedishService);


    function typedishService($http) {

      return {
        getTypeDishesbyRestaurant : function(id_restaurant, callback) {
          var data = {};
          $http.get(api.url + '/typedishes/restaurant/' + id_restaurant, data).then(
              function(result) {
                callback(result.data.Type_Dish);
              },
              function(error) {
                console.log(error);
                callback(error);
              }
            );
        },

        add : function(type_dish, callback) {
          
          $http.post(api.url + '/typedishes', type_dish).then(
              function(result) {
                callback(result.data.Type_Dish);
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
