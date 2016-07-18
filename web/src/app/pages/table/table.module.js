(function () {
  'use strict';

  angular.module('BlurAdmin.pages.table', [])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('table', {
          url: '/table',
          templateUrl: 'app/pages/table/table.html',
          controller: 'TableCtrl',
          title: 'Table'
        });
  }

})();