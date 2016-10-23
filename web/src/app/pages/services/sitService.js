(function () {
  'use strict';

  angular.module('BlurAdmin.common.services')
    .service('SitService',sitService);


    function sitService($http) {

      return {
        getActiveSits : function(id_restaurant, callback) {
          var data = {};
          $http.get(api.url + '/sits/restaurant/' + id_restaurant+ '/active', data).then(
              function(result) {
                callback(result.data.Sits);
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
