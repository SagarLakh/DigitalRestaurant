(function () {
  'use strict';

  angular.module('BlurAdmin.pages.chefview', [])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('chefview', {
          url: '/chefview/:id_station',
          templateUrl: 'app/pages/chefview/chefview.html',
          controller: 'ChefViewCtrl',
          title: 'Chef View'
        });
  }

})();