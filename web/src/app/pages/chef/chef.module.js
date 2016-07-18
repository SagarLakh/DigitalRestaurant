(function () {
  'use strict';

  angular.module('BlurAdmin.pages.chef', [])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('chef', {
          url: '/worker/chef',
          templateUrl: 'app/pages/chef/chef.html',
          controller: 'ChefCtrl',
          title: 'Chef'
        });
  }

})();