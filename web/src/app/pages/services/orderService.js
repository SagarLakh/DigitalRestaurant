(function () {
  'use strict';

  angular.module('BlurAdmin.common.services')
    .service('OrderService',orderService);


    function orderService($http) {

      return {
        getActiveOrdersbyStationAndTable : function(data, callback) {
          var return_var = {};
          $http.post(api.url + '/orders/active/station/table', data).then(
              function(result) {
                return_var.i = data.iteration;
                return_var.Orders = result.data.Orders;
                callback(return_var);
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
