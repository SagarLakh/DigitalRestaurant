(function () {
  'use strict';

  angular.module('BlurAdmin.common.services')
    .service('ListAllergiesService',listallergiesService);


    function listallergiesService($http) {

      return {
        add : function(data, callback) {
          $http.post(api.url + '/listallergies', data).then(
              function(result) {
                callback(result.data.List_Allergies);
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
