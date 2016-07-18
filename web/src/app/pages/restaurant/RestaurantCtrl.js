/**
 * @author a.demeshko
 * created on 28.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.restaurant')
    .controller('RestaurantCtrl', RestaurantCtrl);

  /** @ngInject */
  function RestaurantCtrl($stateParams) {
    console.log('Restaurant Controller');
  }

})();