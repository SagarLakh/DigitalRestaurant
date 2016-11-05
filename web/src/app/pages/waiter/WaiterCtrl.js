/**
 * @author a.demeshko
 * created on 28.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.waiter')
    .controller('WaiterCtrl', WaiterCtrl);

  /** @ngInject */
  function WaiterCtrl($stateParams, NotificationService, ProfileService, ImageService, RestaurantService, UserService, WorkerService, NationalityService, WaiterService, AdminService, $state, $http, $scope, $animateCss, $uibModal, $filter, fileReader) {

    $scope.waiters = {};
    $scope.picture = $filter('appImage')('theme/no-photo.png');
    $scope.removePicture = function () {
      $scope.picture = $filter('appImage')('theme/no-photo.png');
      $scope.item.img_path = null;
      $scope.noPicture = true;
    };

    $scope.uploadPicture = function () {
      var fileInput = document.getElementById('uploadFile');
      fileInput.click();
    };

    $scope.getFile = function () {
      console.log(this.file);
      fileReader.readAsDataUrl(this.file, $scope)
          .then(function (result) {
            $scope.item.img_path = result;
            $scope.picture = result;
          });
    };
    $scope.RemoveWaiter = function(waiter){
      UserService.deleteById(waiter.id_user, function(result){
        var data = {
                  type : "success",
                  msg: waiter.name + " deleted successfully, goodbye :(",
                  title: "Waiter deleted"
                };
          NotificationService.openNotification(data);
          WaiterService.getWaitersbyRestaurant(id_restaurant, function(Waiters) {
            $scope.waiters = Waiters;
            console.log($scope.waiters);
          });
      });
    };
    

    $scope.openModalCreate = function (page, size) {
      $scope.item = {img_path : $filter('appImage')('theme/no-photo.png')}; 
      $scope.item.id_restaurant = id_restaurant;
      console.log($scope.item);
      $scope.TheModal = $uibModal.open({
        animation: true,
        templateUrl: page,
        size: size,
        scope: $scope
        
      });
    };

    $scope.openModalEdit = function (page, size, data) {
      var waiter = JSON.parse(JSON.stringify(data));

      if (waiter.img_path === null) {$scope.picture = $filter('appImage')('theme/no-photo.png'); console.log($scope.picture);}
      else $scope.picture = waiter.img_path;
      $scope.item = waiter;
      $scope.item.id_restaurant = id_restaurant;
      $scope.item.nat = {
        ISOCode : waiter.ISOCode,
        country_name : waiter.country_name,
        ISOCode3 : waiter.ISOCode3,
        id_nationality : waiter.id_nationality
      };

      console.log($scope.item);
      $scope.TheModal = $uibModal.open({
        animation: true,
        templateUrl: page,
        size: size,
        scope: $scope
        
      });
    };

    $scope.add = function (item) {
      $scope.TheModal.close();
      console.log(item);
      UserService.addUser(item, function(User) {
        item.id_nationality = item.nat.id_nationality;
        item.id_user = User.insertId;
        WorkerService.addWorker(item, function(Worker) {
          console.log(Worker);
          console.log(item);
          item.id_worker = Worker.insertId;
          console.log(item);
          WaiterService.addWaiter(item, function(Waiter) {
            console.log(Waiter);
            var data = {
                  type : "success",
                  msg: item.name + " have been added correctly :)",
                  title: "Waiter added"
            };
            NotificationService.openNotification(data);
            WaiterService.getWaitersbyRestaurant(id_restaurant, function(Waiters) {
                $scope.waiters = Waiters;
                console.log($scope.waiters);
              });
          });
        });
      }); 
    };

      $scope.edit = function (item) {
      $scope.TheModal.close();
      console.log(item);
      UserService.editUser(item, function(User) {
        item.id_nationality = item.nat.id_nationality;
        WorkerService.editWorker(item, function(Worker) {
          console.log(Worker);
          console.log(item);
          var data = {
                  type : "success",
                  msg: item.name + " have been changed correctly :)",
                  title: "Waiter changed"
            };
          WaiterService.getWaitersbyRestaurant(id_restaurant, function(Waiters) {
              $scope.waiters = Waiters;
              console.log($scope.waiters);
            });

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
        NationalityService.get(function(Nationalities) {
          $scope.nationalities = Nationalities;
        });
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
              NationalityService.get(function(Nationalities) {
                $scope.nationalities = Nationalities;
              });
            });
          });
      });
      
      
    }

    
   
  }

  

})();