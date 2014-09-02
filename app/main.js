/**
 * Created by hammer on 2014/8/31.
 */
'use strict';

require.config({
    paths: {
        angular: '../bower_components/angular/angular',
        angularRoute: '../bower_components/angular-route/angular-route',
        angularMocks: '../bower_components/angular-mocks/angular-mocks',
        angularResource: '../bower_components/angular-resource/angular-resource',
        angularMessage: '../bower_components/angular-messages/angular-messages',
        angularGrid: '../bower_components/angular-grid/ng-grid-2.0.12.debug',
        bootstrap: '../bower_components/bootstrap/dist/js/bootstrap',
        es5shim : 'bower_components/es5-shim/es5-shim',
        jquery : '../bower_components/jquery/dist/jquery',
        json3   : '../bower_components/json3/lib/json3',
        lodashCompat: '../bower_components/lodash/dist/lodash.compat',
        ngTableX: '../bower_components/ng-table-x/ng-table-x',
        pace: '../bower_components/pace/pace',
        restAngular : "../bower_components/restangular/dist/restangular",
        signalR: '../bower_components/signalr/jquery.signalR-2.0.2',
        uiBootstrap: '../bower_components/angular-bootstrap/ui-bootstrap-tpls',
        text: '../bower_components/requirejs-text/text'
    },
    shim: {
        'angular' : {'exports' : 'angular'},
        'angularRoute': ['angular'],
        'angularMessage' : ['angular'],
        'angularGrid' : ['angular', 'jquery', 'lodashCompat'],
        'restAngular' : ['angular', 'lodashCompat'],
        'angularMocks': {
            deps:['angular'],
            'exports':'angular.mock'
        },
        'ngTableX' : ['angular'],
        'signalR' : ['jquery']
    },
    priority: [
        "angular"
    ]
});

//http://code.angularjs.org/1.2.1/docs/guide/bootstrap#overview_deferred-bootstrap
window.name = "NG_DEFER_BOOTSTRAP!";

require( [
    'jquery',
    'angular',
    'angularRoute',
    'installedModules',
    'signalR'
], function($, angular, angularRoute, installedModules) {

    var requireModuleList = [];
    angular.forEach(installedModules, function(module){
        requireModuleList.push('modules/' + module.id + "/app");
    });
    require([
        'app',
        'routes'
    ].concat(requireModuleList), function(app){
        var $html = angular.element(document.getElementsByTagName('html')[0]);

        angular.element().ready(function() {
            angular.resumeBootstrap([app['name']]);
        });
    })
});