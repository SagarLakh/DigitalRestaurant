(function () {
  'use strict';

  angular.module('BlurAdmin.common.services')
    .service('UserService',userService);


    function userService($http) {

      return {
        addUser : function(data, callback) {
          $http.post(api.url + '/users', data).then(
              function(result) {
                callback(result.data.User);
              },
              function(error) {
                console.log(error);
                callback(error);
              }
            );
        },

        deleteById : function(id_user, callback) {
          $http.delete(api.url + '/users/id/' + id_user).then(
              function(result) {
                callback(result.data.User);
              },
              function(error) {
                console.log(error);
                callback(error);
              }
            );
        },

        editUser : function(data, callback) {
          $http.put(api.url + '/users', data).then(
              function(result) {
                console.log("Log of userservice " + result.data.User);
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
