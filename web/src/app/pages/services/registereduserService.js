(function () {
  'use strict';

  angular.module('BlurAdmin.common.services')
    .service('RegisteredUserService',registereduserService);


    function registereduserService($http) {

      return {
        addRegisteredUser : function(data, callback) {
          $http.post(api.url + '/registeredusers', data).then(
              function(result) {
                callback(result.data.User);
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
