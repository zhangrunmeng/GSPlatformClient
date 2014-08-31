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
                $routeProvider.when(module.url, moduleInfo);
            });
            $routeProvider.otherwise({redirectTo: '/'});
        }])
        .controller("gsPlatformController", function($scope, $location){
            var url = $location.url();

            var initialize = function() {
                angular.forEach(installedModules, function (module) {
                    if (url == module.url) {
                        $scope.selectedModule = module.id;
                        app.constant('selectedModule', module.id);
                        app.constant('modulePathPrefix', 'modules/' + module.module + '/');
                    }
                });
            };
            initialize();
        });

});