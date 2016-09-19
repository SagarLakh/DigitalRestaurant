(function () {
  'use strict';

  angular.module('BlurAdmin.common.services')
    .service('AdminService',adminService);


    function adminService($http) {

      return {
        getAdminbyRegisteredUser : function(id_registered_user, callback) {
          var data = {};
          $http.get(api.url + '/admins/registereduser/' + id_registered_user, data).then(
              function(result) {
                callback(result.data.Admin[0]);
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
