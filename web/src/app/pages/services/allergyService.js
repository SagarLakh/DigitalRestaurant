(function () {
  'use strict';

  angular.module('BlurAdmin.common.services')
    .service('AllergyService',allergyService);


    function allergyService($http) {

      return {
        getAllergies : function(callback) {
          var data = {};
          $http.get(api.url + '/allergies', data).then(
              function(result) {
                callback(result.data.Allergies);
              },
              function(error) {
                console.log(error);
                callback(error);
              }
            );
        },
         getAllergiesByDish : function(id_dish, callback) {
          var data = {};
          $http.get(api.url + '/allergies/dish/' + id_dish, data).then(
              function(result) {
                callback(result.data.Allergies);
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
