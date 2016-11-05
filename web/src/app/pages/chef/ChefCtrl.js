/**
 * @author a.demeshko
 * created on 28.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.chef')
    .controller('ChefCtrl', ChefCtrl);

  /** @ngInject */
  function ChefCtrl($stateParams, NotificationService, ProfileService, UserService, WorkerService, NationalityService, RestaurantService, ChefService, AdminService, $state, $http, $scope, $animateCss, $uibModal, $filter, fileReader) {

    $scope.chefs = {};
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
    
    $scope.RemoveChef = function(chef){
      UserService.deleteById(chef.id_user, function(result){
          var data = {
                  type : "success",
                  msg: chef.name + " deleted successfully :(",
                  title: "Chef deleted"
          };
          NotificationService.openNotification(data);
          ChefService.getChefsbyRestaurant(id_restaurant, function(Chefs) {
            $scope.chefs = Chefs;
            console.log($scope.chefs);
            
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
      var chef = JSON.parse(JSON.stringify(data));

      if (chef.img_path === null) {$scope.picture = $filter('appImage')('theme/no-photo.png'); console.log($scope.picture);}
      else $scope.picture = chef.img_path;
      $scope.item = chef;
      $scope.item.id_restaurant = id_restaurant;
      $scope.item.nat = {
        ISOCode : chef.ISOCode,
        country_name : chef.country_name,
        ISOCode3 : chef.ISOCode3,
        id_nationality : chef.id_nationality
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
          ChefService.addChef(item, function(Chef) {
            console.log(Chef);
            var data = {
                  type : "success",
                  msg: item.name + " have been added correctly :)",
                  title: "Chef added"
            };
            NotificationService.openNotification(data);
            ChefService.getChefsbyRestaurant(id_restaurant, function(Chefs) {
                $scope.chefs = Chefs;
                console.log($scope.chefs);
                
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
          ChefService.getChefsbyRestaurant(id_restaurant, function(Chefs) {
              $scope.chefs = Chefs;
              console.log($scope.chefs);
            });

        });
      }); 
    };
  

    console.log('Chef Controller');
    var username = ProfileService.getCookie("username");
    var token = ProfileService.getCookie("token_id");
    var uid = ProfileService.getCookie("uid");
    var id_restaurant = ProfileService.getCookie("id_restaurant");
    ProfileService.checkUser(username, token);
    
    if (id_restaurant != "") {
      
      ChefService.getChefsbyRestaurant(id_restaurant, function(Chefs) {
        $scope.chefs = Chefs;
        console.log($scope.chefs);
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
            ChefService.getChefsbyRestaurant(id_restaurant, function(Chefs) {
              $scope.chefs = Chefs;
              console.log($scope.chefs);
              NationalityService.get(function(Nationalities) {
                $scope.nationalities = Nationalities;
              });
            });
          });
      });
      
      
    }
    
   
  }

  

})();
