(function () {
  'use strict';

  angular.module('BlurAdmin.common.services')
    .service('ListStationsService',liststationsService);


    function liststationsService($http) {

      return {
        
        add : function(data, callback) {
          $http.post(api.url + '/liststations', data).then(
              function(result) {
                callback(result.data.ListStations);
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
