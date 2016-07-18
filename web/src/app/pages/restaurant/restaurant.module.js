(function () {
  'use strict';

  angular.module('BlurAdmin.pages.restaurant', [])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('restaurant', {
          url: '/restaurant',
          templateUrl: 'app/pages/restaurant/restaurant.html',
          controller: 'RestaurantCtrl',
          title: 'Restaurant'
        });
  }

})();