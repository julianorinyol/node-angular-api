'use strict';

angular.module('nodeAngularApiApp', [
  'nodeAngularApiApp.auth',
  'nodeAngularApiApp.admin',
  'nodeAngularApiApp.constants',
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'btford.socket-io',
  'ui.router',
  'ui.bootstrap',
  'validation.match'
])
  .config(function($urlRouterProvider, $locationProvider) {
    $urlRouterProvider
      .otherwise('/');

    $locationProvider.html5Mode(true);
  });
