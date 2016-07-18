(function () {
  'use strict';

  angular.module('BlurAdmin.pages.waiter', [])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('waiter', {
          url: '/worker/waiter',
          templateUrl: 'app/pages/waiter/waiter.html',
          controller: 'WaiterCtrl',
          title: 'Waiter'
        });
  }

})();