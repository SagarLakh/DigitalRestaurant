/**
 * @author a.demeshko
 * created on 28.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.restaurant')
    .controller('RestaurantCtrl', RestaurantCtrl);

  /** @ngInject */
  function RestaurantCtrl($stateParams, ProfileService, RestaurantService, AdminService, $state, $http, $scope) {

    $scope.restaurants = {};
    var id_admin;
    
    $scope.RemoveRestaurant = function(index){
      var id_restaurant = $scope.restaurants[index].id_restaurant;
      RestaurantService.delete(id_restaurant, function(result){
          RestaurantService.getRestaurantsbyAdmin(id_admin, function(Chefs) {
            $scope.restaurants = Restaurants;
          });
      });
    };

    $scope.ChangeActiveRestaurant = function(index){
      var id_restaurant = $scope.restaurants[index].id_restaurant;
      $scope.active_restaurant = id_restaurant;
      ProfileService.setCookie("id_restaurant", id_restaurant, 1000000);
      RestaurantService.getRestaurantsbyAdmin(id_admin, function(Restaurants) {
        $scope.restaurants = Restaurants;
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