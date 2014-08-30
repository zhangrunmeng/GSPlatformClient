'use strict';

var $installedModules = [
    {
        id : "job",
        module : 'jobManagement',
        url : "/job"
    },
    {
        id : "home",
        module : 'home',
        url : "/"
    }
];
/**
 * @ngdoc overview
 * @name stringDetectorWebClientAngularApp
 * @description
 * # stringDetectorWebClientAngularApp
 *
 * Main module of the application.
 */
var $moduleDependencyList = [];
angular.forEach($installedModules, function(module){
    $moduleDependencyList.push(module.module);
});

var $selectedModule = 'home';
angular
  .module('gsPlatformClient', [
    'ngRoute'
    ].concat($moduleDependencyList))
  .config(function ($routeProvider) {
        angular.forEach($installedModules, function(module){
            $routeProvider
                .when(module.url, {
                    templateUrl: 'modules/' + module.module + '/index.html'
                });
        });
        $routeProvider
        .otherwise({
                redirectTo: "/"
            });
  })
  .controller("gsPlatformController", function($scope, $location){
    var url = $location.url();

    var initialize = function() {
        angular.forEach($installedModules, function (module) {
            if (url == module.url) {
                $scope.selectedModule = module.id;
                $scope.modulePathPrefix = 'modules/' + module.module + '/';
                $selectedModule = module.id;
            }
        });
    };
    $scope.$watch('$location.$$absurl', function(value){
        initialize();
    });
    initialize();
  });
