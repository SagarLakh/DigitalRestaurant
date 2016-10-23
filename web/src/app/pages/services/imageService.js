(function () {
  'use strict';

  angular.module('BlurAdmin.common.services')
    .service('ImageService',imageService);


    function imageService($http, UserService, RestaurantService, DishService) {

      return {
        add : function(data){
          $http.post(api.url + '/images', data).then(
              function(result) {
                callback(result.data.Image);
              },
              function(error) {
                console.log(error);
                callback(error);
              }
            );
        },

        getImageByPath : function(img_path) {
          var data = {};
          $http.get(api.url + '/images/img_path/' + img_path).then(
              function(result) {
                callback(result.data.Image);
              },
              function(error) {
                console.log(error);
                callback(error);
              }
            );
        },

        /*createImageById : function(image, table, id) {
          var data = {};

          if (table == "User"){
              UserService.createPic(dish.allergies[i], function(List_Allergies) {
                      console.log(List_Allergies);
                      });
          }
          else if(table == "Restaurant"){

          }
          else if(table == "Dish"){
            
          }

          
          $http.post(api.url + '/images/img_path/' + img_path).then(
              function(result) {
                callback(result.data.Image);
              },
              function(error) {
                console.log(error);
                callback(error);
              }
            );
        },*/

        getMessagesByLabel : function(label){
          return messages.filter(function(m){
            return m.labels.indexOf(label) != -1;
          });
        }
      }
    }

})();
