/**
 * Created by hammer on 2014/8/31.
 */
define(['angular'], function(angular){

    angular.module("job.controllers", ['job.services'])
        .controller('JobCreateCtrl', function($scope ,$modal, Restangular, $injector){
            require(['modules/job/scripts/controllers/jobCreate'], function(jobCreate){
                $injector.invoke(jobCreate, this, {
                    '$scope': $scope,
                    '$modal': $modal,
                    'Restangular': Restangular
                });
            });
        })
        .controller('JobDetailCtrl', function($scope, Restangular, ngTableParams, Utility, $injector){
            require(['modules/job/scripts/controllers/jobDetail'], function(jobDetail){
                $injector.invoke(jobDetail, this, {
                    '$scope': $scope,
                    'Restangular': Restangular,
                    'ngTableParams' : ngTableParams,
                    'Utility' : Utility
                });
            });
        })
        .controller('MainCtrl', function($scope,$rootScope,$filter,Restangular,
                                         ngTableParams,signalRHubProxy,serviceUrl,Utility, $injector){
            require(['modules/job/scripts/controllers/main'], function(mainCtrl){
                $injector.invoke(mainCtrl, this, {
                    '$scope': $scope,
                    '$rootScope': $rootScope,
                    '$filter': $filter,
                    'Restangular': Restangular,
                    'ngTableParams' : ngTableParams,
                    'serviceUrl': serviceUrl,
                    'Utility' : Utility
                });
            });
        })
        .controller('checkTimingCtrl', function($scope){
            $scope.message ="The timing input is invalid";
        });
});