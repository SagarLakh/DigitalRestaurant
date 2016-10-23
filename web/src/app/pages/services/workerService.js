(function () {
  'use strict';

  angular.module('BlurAdmin.common.services')
    .service('WorkerService',workerService);


    function workerService($http) {

      return {
        addWorker : function(data, callback) {
          $http.post(api.url + '/workers', data).then(
              function(result) {
                callback(result.data.Worker);
              },
              function(error) {
                console.log(error);
                callback(error);
              }
            );
        },

        editWorker : function(data, callback) {
          $http.put(api.url + '/workers', data).then(
              function(result) {
                callback(result.data.Worker);
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
