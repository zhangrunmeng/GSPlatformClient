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
    .module('home', [])
    .constant('serviceUrl','http://vhwebdevserver.eng.citrite.net')
    .config(function(RestangularProvider, serviceUrl){
        RestangularProvider.setBaseUrl(serviceUrl+'/api/');
    });

angular.module('home')
    .factory('HomeUtility',function(){
    });