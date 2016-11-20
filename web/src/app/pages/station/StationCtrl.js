/**
 * @author a.demeshko
 * created on 28.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.station')
    .controller('StationCtrl', StationCtrl);

  /** @ngInject */
  function StationCtrl($stateParams, ProfileService, ListStationsService, DishService, NotificationService, RestaurantService, StationService, AdminService, $state, $uibModal, $http, $scope) {

    $scope.stations = {};
    $scope.dishes = {};
    $scope.TablePageSize = 5;

    $scope.goToView = function(view, id_station){
      
      var data = {
        'id_station' : id_station
      };
      console.log(data);
      $state.go(view, data);
    };


    $scope.RemoveStation = function(station){
      StationService.delete(station.id_station, function(result){
        var data = {
                  type : "success",
                  msg: "Station deleted Successfully",
                  title: "Station deleted"
                };
          NotificationService.openNotification(data);
          StationService.getStationsbyRestaurant(id_restaurant, function(Stations) {
            $scope.stations = Stations;
            for( var i = 0; i < Stations.length; ++i) {
              StationService.getDishesbyStation(i, Stations[i].id_station, function(result) {
                $scope.stations[result.i].ndishes = result.ndishes;
                DishService.getDishesbyRestaurant(id_restaurant, function(Dishes) {
                      $scope.dishes = Dishes;
                      console.log($scope.dishes);
                  });
              });
            }
            console.log($scope.stations);
          });
      });
    };

    $scope.toggleAllDishes = function() {
      $scope.item.allchecked = !$scope.item.allchecked;
      console.log($scope);
    }

    $scope.toggleDish = function(id_dish) {
      console.log($scope.item);
      var index = $scope.item.checked_dishes.indexOf(id_dish);
      if (index == -1) {
        $scope.item.checked_dishes.push(id_dish);
      }
      else {
        $scope.item.checked_dishes.splice(index, 1);
      }
      console.log($scope);
    }

    $scope.add = function (item) {
      console.log(item);
      $scope.TheModal.close();
      item.id_restaurant = id_restaurant;
      console.log(item);
      StationService.add(item, function(Station) {
        console.log(Station);
        var data = {
                  type : "success",
                  msg: "Station added successfully",
                  title: "Station added"
          };
          NotificationService.openNotification(data);
        StationService.getStationsbyRestaurant(id_restaurant, function(Stations) {
            $scope.stations = Stations;
            for( var i = 0; i < Stations.length; ++i) {
              StationService.getDishesbyStation(i, Stations[i].id_station, function(result) {
                $scope.stations[result.i].ndishes = result.ndishes;
                DishService.getDishesbyRestaurant(id_restaurant, function(Dishes) {
                      $scope.dishes = Dishes;
                      console.log($scope.dishes);
                  });
              });
            }
            console.log($scope.stations);
          });
      });
    };

    $scope.openModalCreate = function (page, size) {
      $scope.item = {};
      $scope.item.checked_dishes = [];

      $scope.TheModal = $uibModal.open({
        animation: true,
        templateUrl: page,
        size: size,
        scope: $scope
        
      });
    };
    
    console.log('Station Controller');
    var username = ProfileService.getCookie("username");
    var token = ProfileService.getCookie("token_id");
    var uid = ProfileService.getCookie("uid");
    var id_restaurant = ProfileService.getCookie("id_restaurant");
    ProfileService.checkUser(username, token);
    
    if (id_restaurant != "") {
      
      StationService.getStationsbyRestaurant(id_restaurant, function(Stations) {
        $scope.stations = Stations;
        for( var i = 0; i < Stations.length; ++i) {
          StationService.getDishesbyStation(i, Stations[i].id_station, function(result) {
            $scope.stations[result.i].ndishes = result.ndishes;
            DishService.getDishesbyRestaurant(id_restaurant, function(Dishes) {
                  $scope.dishes = Dishes;
                  console.log($scope.dishes);
              });
          });
        }
        console.log($scope.stations);
      });
    }
    else {
      AdminService.getAdminbyRegisteredUser(uid, function(Admin) {
          RestaurantService.getidRestaurantsbyAdmin(Admin.id_admin,function(Restaurant) {
            id_restaurant = Restaurant[0].id_restaurant;
            $scope.restaurant = Restaurant[0];
            ProfileService.setCookie("id_restaurant", id_restaurant, 1000000);
            StationService.getStationsbyRestaurant(id_restaurant, function(Stations) {
              $scope.stations = Stations;
              DishService.getDishesbyRestaurant(id_restaurant, function(Dishes) {
                  $scope.dishes = Dishes;
                  console.log($scope.dishes);
              });
              console.log($scope.stations);
            });
          });
      });
      
      
    }

    
   
  }

  

})();