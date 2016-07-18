(function () {
  'use strict';

  angular.module('BlurAdmin.pages.menu', [])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('menu', {
          url: '/menu',
          templateUrl: 'app/pages/menu/menu.html',
          controller: 'MenuCtrl',
          title: 'Menu'
        });
  }

})();