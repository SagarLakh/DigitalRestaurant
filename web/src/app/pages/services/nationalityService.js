(function () {
  'use strict';

  angular.module('BlurAdmin.common.services')
    .service('NationalityService',nationalityService);


    function nationalityService($http) {

      return {
        get : function(callback) {
          var data = {};
          $http.get(api.url + '/nationalities', data).then(
              function(result) {
                callback(result.data.Nationalities);
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
