(function () {
  'use strict';

  angular.module('BlurAdmin.common.services')
    .service('MenuService',menuService);


    function menuService($http, ListDishesService) {

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

        add : function(data, callback) {
          
          console.log(data);
          $http.post(api.url + '/menus', data).then(
              function(result) {
                console.log(data);
                console.log(result);
                var id_menu = result.data.Menu.insertId;
                if (data.allchecked == true) {
                  for (var i = 0; i < data.dishes.length; ++i) {
                    var dish = {
                      id_dish: data.dishes[i].id_dish,
                      id_menu: id_menu
                    }
                    ListDishesService.add(dish, function(ListDish) {
                    });
                  }
                }
                else {
                  for (var i = 0; i < data.checked_dishes.length; ++i) {
                    var dish = {
                      id_dish: data.checked_dishes[i],
                      id_menu: id_menu
                    }
                    console.log(dish);
                    ListDishesService.add(dish, function(ListDish) {
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
