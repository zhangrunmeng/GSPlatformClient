'use strict';
/**
 * @ngdoc overview
 * @name stringDetectorWebClientAngularApp
 * @description
 * # stringDetectorWebClientAngularApp
 *
 * Main module of the application.
 */
angular
  .module('gsPlatformClient', [
    'ngRoute',
    'jobManagement'
  ])
  .config(function ($routeProvider) {
    $routeProvider
    .when('/', {
        templateUrl: 'modules/home/index.html'
    })
    .when('/job', {
        templateUrl: 'modules/jobManagement/index.html'
    })
    .otherwise({
        redirectTo: '/'
    });
  });