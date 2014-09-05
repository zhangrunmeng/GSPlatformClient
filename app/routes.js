/**
 * Created by hammer on 2014/8/31.
 */
'use strict';

define(['angular',
    'app',
    'installedModules'], function(angular, app, installedModules) {

    return app.config(['$routeProvider', function($routeProvider) {
            angular.forEach(installedModules, function(module){
                var moduleInfo = {
                    templateUrl : 'modules/' + module.id + '/main.html'
                };
                if(module.controller){
                    moduleInfo.controller = module.controller;
                }
                $routeProvider.when("/" + module.id, moduleInfo);
            });
            $routeProvider.otherwise({redirectTo: '/'});
        }]);

});