/**
 * @author a.demeshko
 * created on 28.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.station')
    .controller('ChefViewCtrl', ChefViewCtrl);

  /** @ngInject */
  function ChefViewCtrl($stateParams, $uibModal, $interval, DishService, ProfileService, OrderService, RestaurantService, SitService, StationService, AdminService, $state, $http, $scope, baSidebarService) {
    $scope.tables, $scope.sits = {};
    baSidebarService.MenuCollapsed('close');
    var id_station = $stateParams.id_station;
    $scope.stack = [];
    $scope.finished_stack = [];
    var refresh;

    function checkIfSame (lastorder, neworder) {
      if (lastorder.id_dish != neworder.id_dish) return false;
      if (lastorder.comment != neworder.comment) return false;
      if (lastorder.sequence_order != neworder.sequence_order) return false;
      return true;
    };

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
              var count = 1;
              var remove = true;
              var old_seq = $scope.tables[Orders.i].orders.Orders[0].sequence_order;
              var length = $scope.tables[Orders.i].orders.Orders.length;
              var listfinished = [];
              if ($scope.tables[Orders.i].orders.Orders[0].state == 'Ready') listfinished.push($scope.tables[Orders.i].orders.Orders[0].id_order);
              else remove = false;
              $scope.tables[Orders.i].orders.Orders[0].listIds = [$scope.tables[Orders.i].orders.Orders[0].id_order];
              var lastorder = $scope.tables[Orders.i].orders.Orders[0];
              
              console.log($scope.tables[Orders.i].orders.Orders[0].listIds);
              lastorder.count = count;

              for (var j = 1; j < $scope.tables[Orders.i].orders.Orders.length; j++) {
                if(old_seq != $scope.tables[Orders.i].orders.Orders[j].sequence_order) {
                  old_seq = $scope.tables[Orders.i].orders.Orders[j].sequence_order;
                  if (remove) {
                    var listf = {
                      listIds : listfinished,
                      setter : 'true'
                    }
                    OrderService.finishSequence(listf, function(result) {
                      $scope.finished_stack.push(listf.listIds);
                    });
                  }
                  remove = true;
                  listfinished = [];
                }
                
                if ($scope.tables[Orders.i].orders.Orders[j].state != 'Ready') remove = false;
                else listfinished.push($scope.tables[Orders.i].orders.Orders[j].id_order);
                
                $scope.tables[Orders.i].orders.Orders[0].listIds = [$scope.tables[Orders.i].orders.Orders[0].id_order];
                if (checkIfSame(lastorder, $scope.tables[Orders.i].orders.Orders[j])){
                  ++count;
                  lastorder.listIds.push($scope.tables[Orders.i].orders.Orders[j].id_order); 
                  $scope.tables[Orders.i].orders.Orders.splice(j, 1);
                  --j;
                }
                else {
                  $scope.tables[Orders.i].orders.Orders[j].listIds = [$scope.tables[Orders.i].orders.Orders[j].id_order];
                  lastorder.count = count;
                  lastorder = $scope.tables[Orders.i].orders.Orders[j];
                  count = 1;
                  lastorder.count = count;
                  console.log('diferente');
                }
              };


              console.log($scope.tables[Orders.i].orders.Orders);
            });
        };
      });
    };

    function updateOrders () {
      SitService.getActiveSits(id_restaurant, function(Tables) {
        if ($scope.tables.length != Tables.length) $scope.tables = Tables;
        var data = {};
        for(var i = 0; i < $scope.tables.length; ++i) {
          data = {
              id_table : $scope.tables[i].id_table,
              id_station : id_station,
              iteration : i
            }
          OrderService.getActiveOrdersbyStationAndTable(data, function(Orders) {
              console.log(Orders);
              $scope.tables[Orders.i].orders = Orders;
              var count = 1;
              var remove = true;
              var old_seq = $scope.tables[Orders.i].orders.Orders[0].sequence_order;
              var length = $scope.tables[Orders.i].orders.Orders.length;
              var listfinished = [];
              if ($scope.tables[Orders.i].orders.Orders[0].state == 'Ready') listfinished.push($scope.tables[Orders.i].orders.Orders[0].id_order);
              else remove = false;
              $scope.tables[Orders.i].orders.Orders[0].listIds = [$scope.tables[Orders.i].orders.Orders[0].id_order];
              var lastorder = $scope.tables[Orders.i].orders.Orders[0];
              
              console.log($scope.tables[Orders.i].orders.Orders[0].listIds);
              lastorder.count = count;

              for (var j = 1; j < $scope.tables[Orders.i].orders.Orders.length; j++) {
                if(old_seq != $scope.tables[Orders.i].orders.Orders[j].sequence_order) {
                  old_seq = $scope.tables[Orders.i].orders.Orders[j].sequence_order;
                  if (remove) {
                    var listf = {
                      listIds : listfinished,
                      setter : 'true'
                    }
                    OrderService.finishSequence(listf, function(result) {
                      $scope.finished_stack.push(listf.listIds);
                    });
                  }
                  remove = true;
                  listfinished = [];
                }
                
                if ($scope.tables[Orders.i].orders.Orders[j].state != 'Ready') remove = false;
                else listfinished.push($scope.tables[Orders.i].orders.Orders[j].id_order);
                
                $scope.tables[Orders.i].orders.Orders[0].listIds = [$scope.tables[Orders.i].orders.Orders[0].id_order];
                if (checkIfSame(lastorder, $scope.tables[Orders.i].orders.Orders[j])){
                  ++count;
                  lastorder.listIds.push($scope.tables[Orders.i].orders.Orders[j].id_order); 
                  $scope.tables[Orders.i].orders.Orders.splice(j, 1);
                  --j;
                }
                else {
                  $scope.tables[Orders.i].orders.Orders[j].listIds = [$scope.tables[Orders.i].orders.Orders[j].id_order];
                  lastorder.count = count;
                  lastorder = $scope.tables[Orders.i].orders.Orders[j];
                  count = 1;
                  lastorder.count = count;
                  console.log('diferente');
                }
              };
              if (listfinished.lenght != 0) {
                var listf = {
                      listIds : listfinished,
                      setter : 'true'
                    }
                    OrderService.finishSequence(listf, function(result) {
                      $scope.finished_stack.push(listf.listIds);
                    });
              }


              console.log($scope.tables[Orders.i].orders.Orders);
            });
        };
      });
    };



    function doTheChange(listIds,status) {
      for (var i = 0; i < listIds.length; i++) {
        var data = {
          id_order: listIds[i],
          status: status
        };
        OrderService.changeStatus(data, function(result) {
              updateOrders();
            });
      };
      
    };

    $scope.itemOnLongPress = function(id) {
      console.log('Long press');
    }

    $scope.itemOnTouchEnd = function(id) {
      console.log('Touch end');
    }

    $scope.ChangeStateActive = function(dish){
      console.log("state");
      DishService.changeStateActive(dish.id_dish, function(result) {
      });
    };

    $scope.openModalComment = function (page, size, comment) {
      $scope.comment = comment;
      $scope.TheModal = $uibModal.open({
        animation: true,
        templateUrl: page,
        size: size,
        scope: $scope
        
      });
    };

    $scope.openModalDeactivate = function (page, size) {
      DishService.getDishesbyRestaurant(id_restaurant, function(Dishes) {
              $scope.dishes = Dishes;
              console.log($scope);
            });
      $scope.TheModal = $uibModal.open({
        animation: true,
        templateUrl: page,
        size: size,
        scope: $scope
        
      });
    };

    $scope.removeCancelledOrder = function(order) {
      if (order.state == 'Cancelled'){
        OrderService.delete(order.id_order, function(Orders) {
          updateOrders();
        });
      }
      
    };

    $scope.undo = function() {
      if($scope.stack.length != 0) {
        doTheChange($scope.stack[$scope.stack.length-1].listIds,$scope.stack[$scope.stack.length-1].state);
        $scope.stack.pop();
      }
      if($scope.finished_stack.length != 0) {
        var listf = {
                      listIds : $scope.finished_stack[$scope.finished_stack.length-1],
                      setter : 'false'
                    }
        OrderService.finishSequence(listf, function(result) {});
        $scope.finished_stack.pop();
      }
    }

    $scope.changeNextStatus = function(order){

      if(order.state == 'Changed') {doTheChange(order.listIds,'Waiting');$scope.stack.push(order);}
      else if(order.state == 'Waiting') {doTheChange(order.listIds,'In Process');$scope.stack.push(order);}
      else if(order.state == 'In Process') {doTheChange(order.listIds,'Ready');$scope.stack.push(order);}
      
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
    $interval(updateOrders, 3000);

    
   
  }

  

})();