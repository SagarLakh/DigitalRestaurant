(function () {
  'use strict';

  angular.module('BlurAdmin.common.services')
    .service('TableService',tableService);


    function tableService($http) {

      return {
        getTablesbyRestaurant : function(id_restaurant, callback) {
          var data = {};
          $http.get(api.url + '/tables/restaurant/' + id_restaurant, data).then(
              function(result) {
                callback(result.data.Tables);
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
