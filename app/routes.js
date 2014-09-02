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
        .controller("gsPlatformController", function($rootScope, $scope, $location, $element, $window){
            var initialize = function(newvalue, oldvalue) {
                if(newvalue !== oldvalue){
                    angular.forEach(installedModules, function (module) {
                        if (newvalue == module.url) {
                            $scope.selectedModule = module.id;
                            $scope.$modulePath = 'modules/' + module.id + '/';
                            $rootScope.$modulePath = 'modules/' + module.id + '/';
                        }
                    });
                }
            };
            initialize($location.url());
            $scope.$watch(function(){return $location.url()}, initialize);
            $scope.$contentScale = function(){
                return {width: $element.width(), height: $element.height() - 63}
            };
            angular.element($window).bind('resize',function(){
                $scope.$broadcast('updateSize', {width: $element.width(), height: $element.height() - 63});
            });
        });

});