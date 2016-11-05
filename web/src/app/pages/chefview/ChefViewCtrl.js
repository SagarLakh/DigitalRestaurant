/**
 * @author a.demeshko
 * created on 28.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.station')
    .controller('ChefViewCtrl', ChefViewCtrl);

  /** @ngInject */
  function ChefViewCtrl($stateParams, ProfileService, OrderService, RestaurantService, SitService, StationService, AdminService, $state, $http, $scope, baSidebarService) {
    $scope.tables, $scope.sits = {};
    baSidebarService.MenuCollapsed('close');
    var id_station = $stateParams.id_station;
    var stack = [];
    /*data = {
      id_station = id_station,
      id_table = id_table
    }*/
    
    /*$scope.RemoveStation = function(index){
      var id_station = $scope.stations[index].id_station;
      StationService.delete(id_station, function(result){
          StationService.getStationsbyRestaurant(id_restaurant, function(Stations) {
            $scope.stations = Stations;
          });
      });
    };*/

    function getSitsWithOrders() {
      SitService.getActiveSits(id_restaurant, function(Tables) {
        $scope.tables = Tables;
        for (var i = 0; i < Tables.length; i++) {
          var data = {
            id_table : Tables[i].id_table,
            id_station : id_station,
            iteration : i
          }

          OrderService.getActiveOrdersbyStationAndTable(data, function(Orders) {
              $scope.tables[Orders.i].orders = Orders;
              console.log($scope.tables);
            });
        };
      });
    };



    function doTheChange(id_order,status) {
      var data = {
        id_order: id_order,
        status: status
      };
      OrderService.changeStatus(data, function(result) {
              getSitsWithOrders();
            });
    };

    $scope.undo = function() {
      if(stack.length != 0) {
        doTheChange(stack[stack.length-1].id_order,stack[stack.length-1].state);
        stack.pop();
      }
    }

    $scope.changeNextStatus = function(order){
      stack.push(order);
      console.log(stack);
      if(order.state == 'Changed') doTheChange(order.id_order,'Waiting');
      else if(order.state == 'Waiting') doTheChange(order.id_order,'In Process');
      else if(order.state == 'In Process') doTheChange(order.id_order,'Ready');
      else if(order.state == 'Ready') doTheChange(order.id_order,'Payed');
      
    };
    
    console.log('Chef View Controller');
    var username = ProfileService.getCookie("username");
    var token = ProfileService.getCookie("token_id");
    var uid = ProfileService.getCookie("uid");
    var id_restaurant = ProfileService.getCookie("id_restaurant");
    ProfileService.checkUser(username, token);
    
    if (id_restaurant != "") { 
      getSitsWithOrders();
    }
    else {
      AdminService.getAdminbyRegisteredUser(uid, function(Admin) {
          RestaurantService.getidRestaurantsbyAdmin(Admin.id_admin,function(Restaurant) {
            id_restaurant = Restaurant[0].id_restaurant;
            $scope.restaurant = Restaurant[0];
            ProfileService.setCookie("id_restaurant", id_restaurant, 1000000);
              getSitsWithOrders();
          });
      });
      
      
    };

    
   
  }

  

})();