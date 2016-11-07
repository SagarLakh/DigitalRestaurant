/**
 * @author a.demeshko
 * created on 28.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.menu')
    .controller('MenuCtrl', MenuCtrl);


  /** @ngInject */
  function MenuCtrl($stateParams, DishService, NotificationService, baSidebarService, ProfileService, RestaurantService, MenuService, AdminService, $state, $http, $scope, $uibModal) {
    
    $scope.menus = $scope.dishes = {};
    var list_dishes_copy = {};
    $scope.TablePageSize = 5;
    $scope.sequence = [
                      {id_type_dish : 1, name : 'Drink'},
                      {id_type_dish : 2, name : 'Appetizer'},
                      {id_type_dish : 3, name : 'First'},
                      {id_type_dish : 4, name : 'Second'},
                      {id_type_dish : 5, name : 'Third'},
                      {id_type_dish : 6, name : 'Dessert'}
                      ];

    var parseDataToModal = function(item) {
      item.fixed_price = !(item.price == null);
      item.active = (item.active === 'true');
      item.array_days = [];
      for (var i = 0; i < item.listDays.length; i++) {
        item.array_days[i] = (item.listDays[i] === '1');
      };
      item.array_moment_day = [];
      for (var i = 0; i < item.moment_day.length; i++) {
        item.array_moment_day[i] = (item.moment_day[i] === '1');
      };
    }

    $scope.openModalEdit = function (page, size, data) {
      var item = angular.copy(data);
      parseDataToModal(item);
      $scope.item = item;
      console.log($scope.item);
      $scope.TheModal = $uibModal.open({
        animation: true,
        templateUrl: page,
        size: size,
        scope: $scope
        
      });
    };

    $scope.onMenuImportSelect = function(menu) {
      var item = angular.copy(menu);
      parseDataToModal(item);
      var aux = angular.copy($scope.item.create_list_dishes);
      $scope.item = item;
      $scope.item.create_list_dishes = aux;
    };

    $scope.openModalCreate = function (page, size) {
      $scope.item = {};
      $scope.item.create_list_dishes = angular.copy($scope.dishes);
      list_dishes_copy = $scope.item.create_list_dishes;
      console.log($scope.item);
      var response = this;

      response.settings = {};
      response.dishes = {};
      $scope.TheModal = $uibModal.open({
        animation: true,
        templateUrl: page,
        size: size,
        scope: $scope
        
      });
    };

    var parseDataToDB = function(item) {
      item.listDays = '';
      item.moment_day = '';
      if (item.fixed_price == false) item.price = null;
      for (var i = 0; i < item.array_days.length; i++) {
        if(item.array_days[i] == true) item.listDays = item.listDays + '1';
        else item.listDays = item.listDays + '0';
      };
      for (var i = 0; i < item.array_moment_day.length; i++) {
        if(item.array_moment_day[i] == true) item.moment_day = item.moment_day + '1';
        else item.moment_day = item.moment_day + '0';
      };
    }

    $scope.edit = function (item) {
      $scope.TheModal.close();
      parseDataToDB(item);
      console.log(item);
      MenuService.editMenu(item, function(Menu) {
        console.log(Menu);
        var data = {
                  type : "success",
                  msg: "Menu changed successfully :(",
                  title: "Menu uploaded"
          };
          NotificationService.openNotification(data);
        MenuService.getMenusbyRestaurant(id_restaurant, function(Menus) {
            $scope.menus = Menus;
          });
      });
    };

    $scope.add = function (item) {
      item.listdishes = list_dishes_copy;
      $scope.TheModal.close();
      console.log(item);
      parseDataToDB(item);
      console.log(item);
      /*MenuService.add(item, function(Menu) {
        console.log(Menu);
        MenuService.getMenusbyRestaurant(id_restaurant, function(Menus) {
            $scope.menus = Menus;
          });
      });*/
    };



    $scope.RemoveMenu = function(index){
      var id_menu = $scope.menus[index].id_menu;
      MenuService.delete(id_menu, function(result){
          MenuService.getMenusbyRestaurant(id_restaurant, function(Menus) {
            $scope.menus = Menus;
          });
      });
    };

    $scope.ChangeStateActive = function(index){
      console.log("state");
      var id_menu = $scope.menus[index].id_menu;
      MenuService.changeStateActive(id_menu, function(result) {
      });
    };

    $scope.DoLogOut = function(){
      var id_menu = $scope.menus[index].id_menu;
      ProfileService.logOut();
    };

    $scope.ChangeAvailabilityDay = function(n, menu) {
        var data = {};
        data.newdays = '';
        data.menu = menu;
        for (var i = 0; i < menu.listDays.length; i++) {
          if (i == n){
            if (menu.listDays[i] === '1')data.newdays = data.newdays + '0';
            else data.newdays = data.newdays + '1'; 
          }
          else data.newdays = data.newdays + menu.listDays[i];
        };
        console.log(data);
        MenuService.changeDay(data, function(Menus) {
            MenuService.getMenusbyRestaurant(id_restaurant, function(Menus) {
              $scope.menus = Menus;
            });
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
        console.log(Menus);
        DishService.getDishesbyRestaurant(id_restaurant, function(Dishes) {
                  $scope.dishes = Dishes;
                  console.log($scope.dishes);
              });
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
              $scope.active = false;
              console.log(Menus);
              DishService.getDishesbyRestaurant(id_restaurant, function(Dishes) {
                  $scope.dishes = Dishes;
                  console.log($scope.dishes);
              });
            });
          });
      });
      
      
    }
    
   
  }

  

})();
