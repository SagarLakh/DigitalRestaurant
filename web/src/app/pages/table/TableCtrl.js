/**
 * @author a.demeshko
 * created on 28.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.table')
    .controller('TableCtrl', TableCtrl);

  /** @ngInject */
  function TableCtrl($stateParams) {
    console.log('Table Controller');
  }

})();