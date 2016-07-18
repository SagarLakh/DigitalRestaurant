/**
 * @author a.demeshko
 * created on 28.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.menu')
    .controller('MenuCtrl', MenuCtrl);

  /** @ngInject */
  function MenuCtrl($stateParams) {
    console.log('Menu Controller');
  }

})();