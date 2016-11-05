/**
 * @author a.demeshko
 * created on 28.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.station')
    .controller('StationCtrl', StationCtrl);

  /** @ngInject */
  function StationCtrl($stateParams, ProfileService, NotificationService, RestaurantService, StationService, AdminService, $state, $http, $scope) {

    $scope.stations = {};

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
          });
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
              console.log($scope.stations);
            });
          });
      });
      
      
    }

    
   
  }

  

})();