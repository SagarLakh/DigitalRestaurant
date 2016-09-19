'use strict';

var protocol = 'http';

var api = {};
api.port = 8080;
api.domain = 'localhost:' + api.port + '/api';
api.url = protocol + "://" + api.domain;

var web = {};
web.port = 3000;
web.domain = 'localhost:' + web.port;
web.url = protocol + "://" + web.domain;



angular.module('BlurAdmin', [
  'ngAnimate',
  'ui.bootstrap',
  'ui.sortable',
  'ui.router',
  'ngTouch',
  'toastr',
  'smart-table',
  "xeditable",
  'ui.slimscroll',
  'ngJsTree',
  'angular-progress-button-styles',

  'BlurAdmin.theme',
  'BlurAdmin.pages'
]);