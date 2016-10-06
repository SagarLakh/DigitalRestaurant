/**
 * @author a.demeshko
 * created on 28.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.table')
    .controller('TableCtrl', TableCtrl);

  /** @ngInject */
  function TableCtrl($stateParams, ProfileService, TableService, RestaurantService, RangeService, AdminService, $state, $http, $scope) {

    $scope.waiters = {};

    
    $scope.RemoveRange = function(index){
      var id_range = $scope.ranges[index].id_range;
      RangeService.delete(id_range, function(result){
          RangeService.getRangesbyRestaurant(id_restaurant, function(Ranges) {
            $scope.ranges = Ranges;
          });
      });
    };
    
    console.log('Table Controller');
    var username = ProfileService.getCookie("username");
    var token = ProfileService.getCookie("token_id");
    var uid = ProfileService.getCookie("uid");
    var id_restaurant = ProfileService.getCookie("id_restaurant");
    ProfileService.checkUser(username, token);
    
    if (id_restaurant != "") {
      
      RangeService.getRangesbyRestaurant(id_restaurant, function(Ranges) {
        $scope.ranges = Ranges;
        console.log($scope.ranges);
        TableService.getTablesbyRestaurant(id_restaurant, function(Tables) {
	        $scope.tables = Tables;
	        console.log($scope.tables.length);
	        
	      });
      });
    }
    else {
      AdminService.getAdminbyRegisteredUser(uid, function(Admin) {
          RestaurantService.getidRestaurantsbyAdmin(Admin.id_admin,function(Restaurant) {
            id_restaurant = Restaurant[0].id_restaurant;
            $scope.restaurant = Restaurant[0];
            ProfileService.setCookie("id_restaurant", id_restaurant, 1000000);
            RangeService.getRangesbyRestaurant(id_restaurant, function(Ranges) {
              $scope.ranges = Ranges;
              console.log($scope.ranges);
              TableService.getTablesbyRestaurant(id_restaurant, function(Tables) {
		        	$scope.tables = Tables;
		        	console.log($scope.tables);
		        
		      });
            });
          });
      });
      
      
    }

    
   
  }

  

})();