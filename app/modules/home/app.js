/**
 * Created by hammer on 2014/8/31.
 */
'use strict';

/**
 * @ngdoc overview
 * @name stringDetectorWebClientAngularApp
 * @description
 * # stringDetectorWebClientAngularApp
 *
 * Main module of the application.
 */
define(['angular',
    'restAngular'], function(angular){
    angular
        .module('home', ['restangular'])
        .constant('serviceUrl','http://vhwebdevserver.eng.citrite.net')
        .config(function(RestangularProvider, serviceUrl){
            RestangularProvider.setBaseUrl(serviceUrl+'/api/');
        });
});