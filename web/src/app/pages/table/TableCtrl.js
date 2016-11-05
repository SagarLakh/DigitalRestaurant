/**
 * @author a.demeshko
 * created on 28.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.table')
    .controller('TableCtrl', TableCtrl);

  /** @ngInject */
  function TableCtrl($stateParams, NotificationService, ProfileService, TableService, RestaurantService, RangeService, AdminService, $state, $http, $scope, $uibModal) {

    $scope.ranges = {};

    
    $scope.RemoveRange = function(range){
      RangeService.delete(range.id_range, function(result){
          var data = {
                    type : "success",
                    msg: "Range deleted successfully :)",
                    title: "Range deleted"
                  };
          NotificationService.openNotification(data);
          RangeService.getRangesbyRestaurant(id_restaurant, function(Ranges) {
            $scope.ranges = Ranges;
          });
      });
    };

    $scope.openModalEdit = function (page, size, data) {
      var range = JSON.parse(JSON.stringify(data));
      $scope.item = range;
      $scope.item.id_restaurant = id_restaurant;
      console.log($scope.item);
      $scope.TheModal = $uibModal.open({
        animation: true,
        templateUrl: page,
        size: size,
        scope: $scope
        
      });
    };

    function checkOutOfRange(ranges, item) {
      for (var i = 0; i < ranges.length; ++i) {
        if ((item.nmin >= ranges[i].nmin) && (item.nmin <= ranges[i].nmax)) return true;
        if ((item.nmax >= ranges[i].nmin) && (item.nmax <= ranges[i].nmax)) return true;
        if ((item.nmin <= ranges[i].nmin) && (item.nmax >= ranges[i].nmax)) return true;
      }
      return false;
    };

    function wrongOrder(item) {
      if(item.nmin > item.nmax) return true;
      else return false;
    }

    $scope.add = function(item) {
      if (wrongOrder(item)) {
        var data = {
                  type : "error",
                  msg: "'From' has to be less or equal than 'To'",
                  title: "Error creating Range"
                };
          NotificationService.openNotification(data);
      }
      else if(checkOutOfRange($scope.ranges, item)) {
        var data = {
                  type : "error",
                  msg: "You cannot override an existing Range",
                  title: "Error creating Range"
                };
          NotificationService.openNotification(data);
      }

      else {
          item.id_restaurant = id_restaurant;
          $scope.item = {};
          RangeService.add(item, function(result){
            var data = {
                    type : "success",
                    msg: "Range added successfully :)",
                    title: "Range Created"
                  };
            NotificationService.openNotification(data);
              RangeService.getRangesbyRestaurant(id_restaurant, function(Ranges) {
                $scope.ranges = Ranges;
              });
          }); 
        }
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