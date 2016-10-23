/**
 * @author a.demeshko
 * created on 28.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.dish')
    .controller('DishCtrl', DishCtrl);

  /** @ngInject */
  function DishCtrl($stateParams, $state, $http, $scope, $filter, fileReader, DishService, TypeDishService, ProfileService, AllergyService, AdminService, RestaurantService, $uibModal) {
    $scope.dishes, $scope.type_dishes, $scope.restaurant= {};
    $scope.sequence = [
                      {"name":"Drink", "id_sequence":0},
                      {"name":"Appetizer", "id_sequence":1},
                      {"name":"First", "id_sequence":2},
                      {"name":"Second", "id_sequence":3},
                      {"name":"Third", "id_sequence":4},
                      {"name":"Dessert", "id_sequence":5}
                  ];

    $scope.picture = $filter('appImage')('theme/no-photo.png');

    $scope.removePicture = function () {
      $scope.picture = $filter('appImage')('theme/no-photo.png');
      $scope.item.img_path = null;
      $scope.noPicture = true;
    };

    $scope.uploadPicture = function () {
      var fileInput = document.getElementById('uploadFile');
      fileInput.click();
    };

    $scope.getFile = function () {
      console.log(this.file);
      fileReader.readAsDataUrl(this.file, $scope)
          .then(function (result) {
            $scope.item.img_path = result;
            $scope.picture = result;
          });
    };

    $scope.add = function (item) {
      $scope.TheModal.close();
      DishService.addDish(item, function(Dish) {
        console.log(Dish);
        TypeDishService.getTypeDishesbyRestaurant(id_restaurant, function(Type_Dishes){
          $scope.type_dishes = Type_Dishes;
          for (var i = 0; i < $scope.type_dishes.length; i++) {
             DishService.getDishesbyTypeDish(i, $scope.type_dishes[i].id_type_dish, function(Dishes) {
                  $scope.type_dishes[Dishes.i].dishes = Dishes.Dishes;
              });
            
          };
       });
      });
    };

    $scope.edit = function (item) {
      $scope.TheModal.close();
      DishService.editDish(item, function(Dish) {
        console.log(Dish);
        TypeDishService.getTypeDishesbyRestaurant(id_restaurant, function(Type_Dishes){
          $scope.type_dishes = Type_Dishes;
          for (var i = 0; i < $scope.type_dishes.length; i++) {
             DishService.getDishesbyTypeDish(i, $scope.type_dishes[i].id_type_dish, function(Dishes) {
                  $scope.type_dishes[Dishes.i].dishes = Dishes.Dishes;
              });
            
          };
       });
      });
    };

    $scope.addAndRepeat = function (item) {
      DishService.addDish(item, function(Dish) {
        console.log(Dish);
        TypeDishService.getTypeDishesbyRestaurant(id_restaurant, function(Type_Dishes){
          $scope.type_dishes = Type_Dishes;
          for (var i = 0; i < $scope.type_dishes.length; i++) {
             DishService.getDishesbyTypeDish(i, $scope.type_dishes[i].id_type_dish, function(Dishes) {
                  $scope.type_dishes[Dishes.i].dishes = Dishes.Dishes;
                  $scope.item = {};
              });
            
          };
       });

      });
    };

    $scope.openModalCreate = function (page, size) {
      $scope.item = {img_path : $filter('appImage')('theme/no-photo.png')}; 
      $scope.item.id_restaurant = id_restaurant;
      console.log($scope.item);
      $scope.TheModal = $uibModal.open({
        animation: true,
        templateUrl: page,
        size: size,
        scope: $scope
        
      });
    };

    $scope.openModalEdit = function (page, size, data) {

      console.log($scope);
      var item = JSON.parse(JSON.stringify(data));
      AllergyService.getAllergiesByDish(item.id_dish, function(Allergies) {
        item.allergies = Allergies;
        if (item.img_path === null) {$scope.picture = item.img_path= $filter('appImage')('theme/no-photo.png'); console.log($scope.picture);}
        else {$scope.picture = item.img_path;}
        $scope.item = item;
        $scope.item.id_restaurant = id_restaurant;
        console.log($scope.item);
        $scope.TheModal = $uibModal.open({
          animation: true,
          templateUrl: page,
          size: size,
          scope: $scope
          
        });
      });
      
    };
    
    $scope.removeDish = function(dish){
      
      DishService.delete(dish.id_dish, function(result){
          TypeDishService.getTypeDishesbyRestaurant(id_restaurant, function(Type_Dishes){
            $scope.type_dishes = Type_Dishes;
            for (var i = 0; i < $scope.type_dishes.length; i++) {
               DishService.getDishesbyTypeDish(i, $scope.type_dishes[i].id_type_dish, function(Dishes) {
                    $scope.type_dishes[Dishes.i].dishes = Dishes.Dishes;
                });
              
            };
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
            AllergyService.getAllergies(function(Allergies) {
              $scope.allergies = Allergies;
            });
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
          AllergyService.getAllergies(function(Allergies) {
              $scope.allergies = Allergies;
            });
	      	console.log($scope.type_dishes);
	      	
	     });


  	}
   }

  

})();
