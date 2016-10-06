(function () {
  'use strict';

  angular.module('BlurAdmin.pages.station', [])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('station', {
          url: '/station',
          templateUrl: 'app/pages/station/station.html',
          controller: 'StationCtrl',
          title: 'Station'
        });
  }

})();