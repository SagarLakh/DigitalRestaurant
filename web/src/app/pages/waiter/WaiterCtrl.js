/**
 * @author a.demeshko
 * created on 28.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.waiter')
    .controller('WaiterCtrl', WaiterCtrl);

  /** @ngInject */
  function WaiterCtrl($stateParams) {
    console.log('Waiter Controller');
  }

})();