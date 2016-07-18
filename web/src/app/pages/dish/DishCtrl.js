/**
 * @author a.demeshko
 * created on 28.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.dish')
    .controller('DishCtrl', DishCtrl);

  /** @ngInject */
  function DishCtrl($stateParams) {
    console.log('Dish Controller');
  }

})();