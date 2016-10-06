/**
 * @author v.lugovsky
 * created on 16.12.2015
 */

(function () {
  'use strict';

  angular.module('BlurAdmin.pages', [
    'ui.router',

    /*'BlurAdmin.pages.dashboard',
    'BlurAdmin.pages.ui',
    'BlurAdmin.pages.components',
    'BlurAdmin.pages.form',
    'BlurAdmin.pages.tables',
    'BlurAdmin.pages.charts',
    'BlurAdmin.pages.maps',
    'BlurAdmin.pages.profile',*/
    'BlurAdmin.pages.menu',
    'BlurAdmin.pages.dish',
    'BlurAdmin.pages.chef',
    'BlurAdmin.pages.waiter',
    'BlurAdmin.pages.restaurant',
    'BlurAdmin.pages.table',
    'BlurAdmin.pages.station',
    'BlurAdmin.common.services'
  ])
      .config(routeConfig);

  /** @ngInject */

  function routeConfig($urlRouterProvider, baSidebarServiceProvider) {
    $urlRouterProvider.otherwise('/menu');

    baSidebarServiceProvider.addStaticItem({
      title: 'Menu',
      stateRef: 'menu',
      icon: 'icon-menu'
    }, {
      title: 'Dish',
      stateRef: 'dish',
      icon: 'icon-hot-meal'
    }, {
      title: 'Worker',
      blank: true,
      icon: 'ion-more',
      subMenu: [{
        title: 'Chef',
        stateRef: 'chef',
        icon:'icon-chef-hat'
      }, {
        title: 'Waiter',
        stateRef: 'waiter',
        icon:'icon-hot-meal'
      }]
    }, {
      title: 'Restaurant',
      stateRef: 'restaurant',
      icon: 'ion-android-restaurant'
    }, {
      title: 'Table',
      stateRef: 'table',
      icon:'icon-table-paper'
    }, {
      title: 'Station',
      stateRef: 'station',
      icon:'ion-ipad'
    });

    /*baSidebarServiceProvider.addStaticItem({
      title: 'Pages',
      icon: 'ion-document',
      subMenu: [{
        title: 'Sign In',
        fixedHref: 'auth.html',
        blank: true
      }, {
        title: 'Sign Up',
        fixedHref: 'reg.html',
        blank: true
      }, {
        title: 'User Profile',
        stateRef: 'profile'
      }, {
        title: '404 Page',
        fixedHref: '404.html',
        blank: true
      }]
    });
    baSidebarServiceProvider.addStaticItem({
      title: 'Menu Level 1',
      icon: 'ion-ios-more',
      subMenu: [{
        title: 'Menu Level 1.1',
        disabled: true
      }, {
        title: 'Menu Level 1.2',
        subMenu: [{
          title: 'Menu Level 1.2.1',
          disabled: true
        }]
      }]
    });*/
  }

})();
