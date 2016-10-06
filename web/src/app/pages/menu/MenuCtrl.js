/**
 * @author a.demeshko
 * created on 28.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.menu')
    .controller('MenuCtrl', MenuCtrl);


  /** @ngInject */
  function MenuCtrl($stateParams, ProfileService, RestaurantService, MenuService, AdminService, $state, $http, $scope) {

    $scope.menus = {};

    
    $scope.RemoveMenu = function(index){
      var id_menu = $scope.menus[index].id_menu;
      MenuService.delete(id_menu, function(result){
          MenuService.getMenusbyRestaurant(id_restaurant, function(Menus) {
            $scope.menus = Menus;
          });
      });
    };

    $scope.ChangeStateActive = function(index){
      var id_menu = $scope.menus[index].id_menu;
      MenuService.changeStateActive(id_menu, function(result) {
      });
    };

    $scope.DoLogOut = function(){
      var id_menu = $scope.menus[index].id_menu;
      ProfileService.logOut();
    };

    $scope.ChangeAvailabilityDay = function(n, index) {
      /*console.log(n);
      console.log(index);
      console.log($scope.menus[index].listDays);
        var holi = {};
        holi.listDays= $scope.menus[index].listDays;
        console.log(holi.listDays);
        holi.listDays[n] = !(holi.listDays[n]===1);
        console.log(holi.listDays);*/

        $http.put(api.url + '/menus')
        .success(function(data) {
            $scope.menus = data.Menus;
            console.log($scope.menus);
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });

    };
    
    console.log('Menu Controller');
    var username = ProfileService.getCookie("username");
    var token = ProfileService.getCookie("token_id");
    var uid = ProfileService.getCookie("uid");
    var id_restaurant = ProfileService.getCookie("id_restaurant");
    ProfileService.checkUser(username, token);
    
    if (id_restaurant != "") {
      
      MenuService.getMenusbyRestaurant(id_restaurant, function(Menus) {
        $scope.menus = Menus;
      });
    }
    else {
      AdminService.getAdminbyRegisteredUser(uid, function(Admin) {
          RestaurantService.getidRestaurantsbyAdmin(Admin.id_admin,function(Restaurant) {
            id_restaurant = Restaurant[0].id_restaurant;
            $scope.restaurant = Restaurant[0];
            ProfileService.setCookie("id_restaurant", id_restaurant, 1000000);
            MenuService.getMenusbyRestaurant(id_restaurant, function(Menus) {
              $scope.menus = Menus;
            });
          });
      });
      
      
    }
    
   
  }

  

})();
