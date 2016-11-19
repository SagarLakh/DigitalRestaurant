(function () {
  'use strict';

  angular.module('BlurAdmin.common.services')
    .service('ListDishesService',listdishesService);


    function listdishesService($http) {

      return {
        getListDishesbyRegisteredUser : function(id_registered_user, callback) {
          var data = {};
          $http.get(api.url + '/listdishes/registereduser/' + id_registered_user, data).then(
              function(result) {
                callback(result.data.ListDishes[0]);
              },
              function(error) {
                console.log(error);
                callback(error);
              }
            );
        },

        getDishesbyMenu : function(id_menu, callback) {
          var data = {};
          $http.get(api.url + '/listdishes/menu/' + id_menu, data).then(
              function(result) {
                callback(result.data.Dishes);
              },
              function(error) {
                console.log(error);
                callback(error);
              }
            );
        },
        add : function(data, callback) {
          $http.post(api.url + '/listdishes', data).then(
              function(result) {
                callback(result.data.ListDishes);
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
