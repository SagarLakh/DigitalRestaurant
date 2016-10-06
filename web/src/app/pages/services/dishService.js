(function () {
  'use strict';

  angular.module('BlurAdmin.common.services')
    .service('DishService',dishService);


    function dishService($http) {
      

      return {
        getDishesbyRestaurant : function(id_restaurant, callback) {
          var data = {};
          $http.get(api.url + '/dishes/restaurant/' + id_restaurant, data).then(
              function(result) {
                callback(result.data.Dishes);
              },
              function(error) {
                console.log(error);
                callback(error);
              }
            );
        },
        getDishesbyTypeDish : function(i, id_type_dish, callback) {
          var data = {};
          var return_var = {};
          $http.get(api.url + '/dishes/type_dish/' + id_type_dish, data).then(
              function(result) {
                return_var.i = i;
                return_var.Dishes = result.data.Dishes;
                callback(return_var);
              },
              function(error) {
                console.log(error);
                callback(error);
              }
            );
        },

        delete : function(id_dish, callback) {
          var data = {};
          $http.get(api.url + '/dishes/restaurant/' + id_dish, data).then(
              function(result) {
                callback(result.data.Dishes);
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
