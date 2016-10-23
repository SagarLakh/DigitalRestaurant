(function () {
  'use strict';

  angular.module('BlurAdmin.common.services')
    .service('MenuService',menuService);


    function menuService($http) {

      return {
        getMenusbyRestaurant : function(id_restaurant, callback) {
          var data = {};
          $http.get(api.url + '/restaurants/' + id_restaurant + '/menus', data).then(
              function(result) {
                callback(result.data.Menus);
              },
              function(error) {
                console.log(error);
                callback(error);
              }
            );
        },
        changeStateActive : function(id_menu, callback) {
          var data = {};
          $http.put(api.url + '/menus/' + id_menu + '/active', data).then(
              function(result) {
                callback(result.data);
              },
              function(error) {
                console.log(error);
                callback(error);
              }
            );
        },

        changeDay : function(data, callback) {
          $http.put(api.url + '/menus/listdays', data).then(
              function(result) {
                callback(result.data);
              },
              function(error) {
                console.log(error);
                callback(error);
              }
            );
        },

        editMenu : function(data, callback) {
          
          console.log(data);
          $http.put(api.url + '/menus', data).then(
              function(result) {
                callback(result.data);
              },
              function(error) {
                console.log(error);
                callback(error);
              }
            );
        },

        delete : function(id_menu, callback) {
          var data = {};
          $http.delete(api.url + '/menus/' + id_menu, data).then(
              function(result) {
                callback(result.data);
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
