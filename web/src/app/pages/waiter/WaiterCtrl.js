/**
 * @author a.demeshko
 * created on 28.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.waiter')
    .controller('WaiterCtrl', WaiterCtrl);

  /** @ngInject */
  function WaiterCtrl($stateParams, ProfileService, RestaurantService, WaiterService, AdminService, $state, $http, $scope) {

    $scope.waiters = {};

    
    $scope.RemoveWaiter = function(index){
      var id_waiter = $scope.waiters[index].id_waiter;
      WaiterService.delete(id_waiter, function(result){
          WaiterService.getChefsbyRestaurant(id_restaurant, function(Waiters) {
            $scope.waiters = Waiters;
          });
      });
    };
    
    console.log('Waiter Controller');
    var username = ProfileService.getCookie("username");
    var token = ProfileService.getCookie("token_id");
    var uid = ProfileService.getCookie("uid");
    var id_restaurant = ProfileService.getCookie("id_restaurant");
    ProfileService.checkUser(username, token);
    
    if (id_restaurant != "") {
      
      WaiterService.getWaitersbyRestaurant(id_restaurant, function(Waiters) {
        $scope.waiters = Waiters;
        console.log($scope.waiters);
      });
    }
    else {
      AdminService.getAdminbyRegisteredUser(uid, function(Admin) {
          RestaurantService.getidRestaurantsbyAdmin(Admin.id_admin,function(Restaurant) {
            id_restaurant = Restaurant[0].id_restaurant;
            $scope.restaurant = Restaurant[0];
            ProfileService.setCookie("id_restaurant", id_restaurant, 1000000);
            WaiterService.getWaitersbyRestaurant(id_restaurant, function(Waiters) {
              $scope.waiters = Waiters;
              console.log($scope.waiters);
            });
          });
      });
      
      
    }

    
   
  }

  

})();