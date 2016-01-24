'use strict';

angular.module('nodeAngularApiApp.auth', [
  'nodeAngularApiApp.constants',
  'nodeAngularApiApp.util',
  'ngCookies',
  'ui.router'
])
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
  });
