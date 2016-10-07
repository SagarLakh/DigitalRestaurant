/**
 * @author a.demeshko
 * created on 28.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.chef')
    .controller('ChefCtrl', ChefCtrl);

  /** @ngInject */
  function ChefCtrl($stateParams, ProfileService, RestaurantService, ChefService, AdminService, $state, $http, $scope, $animateCss, $uibModal) {

    $scope.chefs = {};

    
    $scope.RemoveChef = function(index){
      var id_chef = $scope.chefs[index].id_chef;
      ChefService.delete(id_chef, function(result){
          ChefService.getChefsbyRestaurant(id_restaurant, function(Chefs) {
            $scope.chefs = Chefs;
            console.log($scope.chefs);
          });
      });
    };

    $scope.openModal = function (page, size) {
      console.log("de puts o q?");
      $uibModal.open({
        animation: true,
        templateUrl: page,
        size: size,
        resolve: {
          items: function () {
            return $scope.items;
          }
        }
      });
    };
    
    console.log('Chef Controller');
    var username = ProfileService.getCookie("username");
    var token = ProfileService.getCookie("token_id");
    var uid = ProfileService.getCookie("uid");
    var id_restaurant = ProfileService.getCookie("id_restaurant");
    ProfileService.checkUser(username, token);
    
    if (id_restaurant != "") {
      
      ChefService.getChefsbyRestaurant(id_restaurant, function(Chefs) {
        $scope.chefs = Chefs;
        console.log($scope.chefs);
      });
    }
    else {
      AdminService.getAdminbyRegisteredUser(uid, function(Admin) {
          RestaurantService.getidRestaurantsbyAdmin(Admin.id_admin,function(Restaurant) {
            id_restaurant = Restaurant[0].id_restaurant;
            $scope.restaurant = Restaurant[0];
            ProfileService.setCookie("id_restaurant", id_restaurant, 1000000);
            ChefService.getChefsbyRestaurant(id_restaurant, function(Chefs) {
              $scope.chefs = Chefs;
              console.log($scope.chefs);
            });
          });
      });
      
      
    }
    
   
  }

  

})();
