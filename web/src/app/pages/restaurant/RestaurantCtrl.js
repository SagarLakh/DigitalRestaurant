/**
 * @author a.demeshko
 * created on 28.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.restaurant')
    .controller('RestaurantCtrl', RestaurantCtrl);

  /** @ngInject */
  function RestaurantCtrl($stateParams, NotificationService, ProfileService, RestaurantService, AdminService, $state, $http, $scope, $filter, $uibModal) {

    $scope.restaurants = {};
    var id_admin;
    
    $scope.RemoveRestaurant = function(restaurant){
      RestaurantService.delete(restaurant.id_restaurant, function(result){
        var data = {
                  type : "success",
                  msg: restaurant.name + " deleted successfully",
                  title: "Restaurant deleted"
                };
          NotificationService.openNotification(data);
          RestaurantService.getRestaurantsbyAdmin(id_admin, function(Restaurants) {
            $scope.restaurants = Restaurants;
          });
      });
    };

    $scope.ChangeActiveRestaurant = function(restaurant){
      $scope.active_restaurant = restaurant.id_restaurant;
      ProfileService.setCookie("id_restaurant", restaurant.id_restaurant, 1000000);
      var data = {
                  type : "info",
                  msg: "Now you are administrating " + restaurant.name,
                  title: "Restaurant"
                };
          NotificationService.openNotification(data);
      RestaurantService.getRestaurantsbyAdmin(id_admin, function(Restaurants) {
        $scope.restaurants = Restaurants;
      });
    };

    $scope.add = function (item) {
      $scope.TheModal.close();
      item.id_admin = id_admin;
      RestaurantService.add(item, function(Restaurant) {
        var data = {
                  type : "success",
                  msg: item.name + " created successfully",
                  title: "Restaurant created"
                };
          NotificationService.openNotification(data);
        RestaurantService.getRestaurantsbyAdmin(id_admin,function(Restaurants) {
          console.log(Restaurants);
          $scope.restaurants = Restaurants;
          if (id_restaurant == "") {
            id_restaurant = Restaurants[0].id_restaurant;
            $scope.active_restaurant = id_restaurant;
            ProfileService.setCookie("id_restaurant", id_restaurant, 1000000);
          }
          else {
            $scope.active_restaurant = id_restaurant;
          }
        });
      });
    };

    $scope.edit = function (item) {
      $scope.TheModal.close();
      RestaurantService.edit(item, function(Restaurant) {
        var data = {
                  type : "success",
                  msg: item.name + " changed successfully",
                  title: "Restaurant changed"
                };
          NotificationService.openNotification(data);
        RestaurantService.getRestaurantsbyAdmin(id_admin,function(Restaurants) {
          console.log(Restaurants);
          $scope.restaurants = Restaurants;
          if (id_restaurant == "") {
            id_restaurant = Restaurants[0].id_restaurant;
            $scope.active_restaurant = id_restaurant;
            ProfileService.setCookie("id_restaurant", id_restaurant, 1000000);
          }
          else {
            $scope.active_restaurant = id_restaurant;
          }
        });
      });
    };

    $scope.openModalCreate = function (page, size) {
      $scope.item = {img_path : $filter('appImage')('theme/no-photo.png')}; 
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
      if (item.img_path === null) {$scope.picture = item.img_path= $filter('appImage')('theme/no-photo.png'); console.log($scope.picture);}
      else {$scope.picture = item.img_path;}
      $scope.item = item;
      console.log($scope.item);
      $scope.TheModal = $uibModal.open({
        animation: true,
        templateUrl: page,
        size: size,
        scope: $scope
        
      });
      
    };
    
    console.log('Restaurant Controller');
    var username = ProfileService.getCookie("username");
    var token = ProfileService.getCookie("token_id");
    var uid = ProfileService.getCookie("uid");
    var id_restaurant = ProfileService.getCookie("id_restaurant");
    ProfileService.checkUser(username, token);
    
   
      
	  AdminService.getAdminbyRegisteredUser(uid, function(Admin) {
	  	  id_admin = Admin.id_admin;
	      RestaurantService.getRestaurantsbyAdmin(id_admin,function(Restaurants) {
	      	console.log(Restaurants);
	        $scope.restaurants = Restaurants;
	        if (id_restaurant == "") {
	        	id_restaurant = Restaurants[0].id_restaurant;
	        	$scope.active_restaurant = id_restaurant;
	        	ProfileService.setCookie("id_restaurant", id_restaurant, 1000000);
	        }
	        else {
	        	$scope.active_restaurant = id_restaurant;
	        }
	        console.log($scope.restaurants);
	        console.log($scope.active_restaurant);
	      });
	  });  
    }
})();