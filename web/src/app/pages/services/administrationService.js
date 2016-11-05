(function () {
  'use strict';

  angular.module('BlurAdmin.common.services')
    .service('AdministrationService',administrationService);


    function administrationService($http) {

      return {
        add : function(data, callback) {
          $http.post(api.url + '/administrations', data).then(
              function(result) {
                callback(result.data.Administration);
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
