(function () {
  'use strict';

  angular.module('BlurAdmin.common.services')
    .service('DishService',dishService);


    function dishService($http, TypeDishService, ListAllergiesService) {
      

      return {
        getDishesbyRestaurant : function(id_restaurant, callback) {
          var data = {};
          $http.get(api.url + '/dishes/restaurant/' + id_restaurant + '/typedish', data).then(
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

        changeStateActive : function(id_dish, callback) {
          var data = {};
          $http.put(api.url + '/dishes/' + id_dish + '/active', data).then(
              function(result) {
                callback(result.data);
              },
              function(error) {
                console.log(error);
                callback(error);
              }
            );
        },

        addDish : function(dish, callback) {
          dish.id_type_dish = {};
          dish.active = 'true';
          if (dish.allergies == undefined) dish.allergies = {};
          dish.sequence = dish.sequence;
          if(dish.newtype == null) {
            dish.id_type_dish = dish.type.id_type_dish;
            console.log(dish);
            $http.post(api.url + '/dishes', dish).then(
              function(result) {
                for (var i = 0; i < dish.allergies.length; i++) {
                    dish.allergies[i].id_dish = result.data.Dish.insertId;
                    console.log(dish.allergies[i]);
                    ListAllergiesService.add(dish.allergies[i], function(List_Allergies) {
                      console.log(List_Allergies);
                      });
                  };
                callback(result.data.Dish);
              },
              function(error) {
                console.log(error);
                callback(error);
              }
            );
          }
          else {
            var data = {
              id_restaurant: dish.id_restaurant,
              name: dish.newtype
            }
            TypeDishService.add(data, function(TypeDish) {
              dish.id_type_dish = TypeDish.insertId;
              $http.post(api.url + '/dishes', dish).then(
                function(result) {
                  for (var i = 0; i < dish.allergies.length; i++) {
                    dish.allergies[i].id_dish = result.data.Dish.insertId;
                    console.log(dish.allergies[i]);
                    ListAllergiesService.add(dish.allergies[i], function(List_Allergies) {
                      console.log(List_Allergies);
                      });
                  };
                  callback(result.data.Dish);
                },
                function(error) {
                  console.log(error);
                  callback(error);
                }
              );
            });
            
          }

          console.log(dish);
        },

        editDish : function(dish, callback) {
          console.log(dish);
          if(dish.newtype == null) {
            console.log(dish);
            $http.put(api.url + '/dishes', dish).then(
              function(result) {
                for (var i = 0; i < dish.allergies.length; i++) {
                    dish.allergies[i].id_dish = result.data.Dish.insertId;
                    console.log(dish.allergies[i]);
                    ListAllergiesService.add(dish.allergies[i], function(List_Allergies) {
                      console.log(List_Allergies);
                      });
                  };
                callback(result.data.Dish);
              },
              function(error) {
                console.log(error);
                callback(error);
              }
            );
          }
          else {
            var data = {
              id_restaurant: dish.id_restaurant,
              name: dish.newtype
            }
            TypeDishService.add(data, function(TypeDish) {
              dish.id_type_dish = TypeDish.insertId;
              $http.post(api.url + '/dishes', dish).then(
                function(result) {
                  for (var i = 0; i < dish.allergies.length; i++) {
                    dish.allergies[i].id_dish = result.data.Dish.insertId;
                    console.log(dish.allergies[i]);
                    ListAllergiesService.add(dish.allergies[i], function(List_Allergies) {
                      console.log(List_Allergies);
                      });
                  };
                  callback(result.data.Dish);
                },
                function(error) {
                  console.log(error);
                  callback(error);
                }
              );
            });
            
          }

          console.log(dish);
        },

        delete : function(id_dish, callback) {
          var data = {};
          $http.delete(api.url + '/dishes/' + id_dish, data).then(
              function(result) {
                callback(result.data.Dish);
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
