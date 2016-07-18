(function () {
  'use strict';

  angular.module('BlurAdmin.pages.dish', [])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('dish', {
          url: '/dish',
          templateUrl: 'app/pages/dish/dish.html',
          controller: 'DishCtrl',
          title: 'Dish'
        });
  }

})();