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
        'installedModules'], function(
        angular,
        installedModules
    ){
        var moduleDependencyList = [];
        angular.forEach(installedModules, function(module){
            moduleDependencyList.push(module.module);
        });

        return angular.module('gsPlatformClient', ['ngRoute'].concat(moduleDependencyList));
    });

