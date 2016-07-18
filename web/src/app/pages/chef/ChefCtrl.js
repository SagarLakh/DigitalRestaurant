/**
 * @author a.demeshko
 * created on 28.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.chef')
    .controller('ChefCtrl', ChefCtrl);

  /** @ngInject */
  function ChefCtrl($stateParams) {
    console.log('Chef Controller');
  }

})();