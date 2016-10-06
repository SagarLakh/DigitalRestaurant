(function () {
  'use strict';

  angular.module('BlurAdmin.common.services')
    .service('ChefService',chefService);


    function chefService($http) {

      return {
        getChefsbyRestaurant : function(id_restaurant, callback) {
          var data = {};
          $http.get(api.url + '/chefs/restaurant/' + id_restaurant, data).then(
              function(result) {
                callback(result.data.Chefs);
              },
              function(error) {
                console.log(error);
                callback(error);
              }
            );
        },

        getMessagesByLabel : function(label){
          return messages.filter(function(m){
            return m.labels.indexOf(label) != -1;
          });
        }
      }
    }

})();
