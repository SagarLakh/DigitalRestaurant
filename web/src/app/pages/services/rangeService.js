(function () {
  'use strict';

  angular.module('BlurAdmin.common.services')
    .service('RangeService',rangeService);


    function rangeService($http) {

      return {
        getRangesbyRestaurant : function(id_restaurant, callback) {
          var data = {};
          $http.get(api.url + '/ranges/restaurant/' + id_restaurant, data).then(
              function(result) {
                console.log(id_restaurant);
                callback(result.data.Ranges);
              },
              function(error) {
                console.log(error);
                callback(error);
              }
            );
        },

        add: function(data, callback) {
          $http.post(api.url + '/ranges', data).then(
              function(result) {
                callback(result.data.Range);
              },
              function(error) {
                console.log(error);
                callback(error);
              }
            );
        },

        delete: function(id_range, callback) {
          var data = {};
          $http.delete(api.url + '/ranges/' + id_range, data).then(
              function(result) {
                callback(result.data.Range);
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
