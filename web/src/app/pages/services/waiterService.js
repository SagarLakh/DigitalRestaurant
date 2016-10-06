(function () {
  'use strict';

  angular.module('BlurAdmin.common.services')
    .service('WaiterService',waiterService);


    function waiterService($http) {

      return {
        getWaitersbyRestaurant : function(id_restaurant, callback) {
          var data = {};
          $http.get(api.url + '/waiters/restaurant/' + id_restaurant, data).then(
              function(result) {
                callback(result.data.Waiters);
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
