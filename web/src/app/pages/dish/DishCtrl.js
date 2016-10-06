/**
 * @author a.demeshko
 * created on 28.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.dish')
    .controller('DishCtrl', DishCtrl);

  /** @ngInject */
  function DishCtrl($stateParams, $state, $http, $scope, DishService, TypeDishService, ProfileService, AdminService, RestaurantService) {
    $scope.dishes, $scope.type_dishes, $scope.restaurant= {};

    
    $scope.RemoveDish = function(index){
      var id_dish = $scope.dishes[index].id_dish;
      DishService.delete(id_dish, function(result){
          DishService.getDishesbyRestaurant(id_restaurant, function(Dishes) {
            $scope.dishes = Dishes;
          });
      });
    };    
    console.log('Dish Controller');
    var username = ProfileService.getCookie("username");
    var token = ProfileService.getCookie("token_id");
    var uid = ProfileService.getCookie("uid");
    var id_restaurant = ProfileService.getCookie("id_restaurant");
    ProfileService.checkUser(username, token);
    
    if (id_restaurant == "") {
      AdminService.getAdminbyRegisteredUser(uid, function(Admin) {
          RestaurantService.getidRestaurantsbyAdmin(Admin.id_admin,function(Restaurant) {
            id_restaurant = Restaurant[0].id_restaurant;
            $scope.restaurant = Restaurant[0];
          });
      });
    }

    else {
      ProfileService.setCookie("id_restaurant", id_restaurant, 1000000);
        TypeDishService.getTypeDishesbyRestaurant(id_restaurant, function(Type_Dishes){
	      	$scope.type_dishes = Type_Dishes;
	      	
	      	for (var i = 0; i < $scope.type_dishes.length; i++) {
	      		
	      		 DishService.getDishesbyTypeDish(i, $scope.type_dishes[i].id_type_dish, function(Dishes) {
	      		 	
	              	$scope.type_dishes[Dishes.i].dishes = Dishes.Dishes;
	            });
	      		
	      	};
	      	console.log($scope.type_dishes);
	      	
	     });


  	}
   }

  

})();
