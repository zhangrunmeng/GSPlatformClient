/**
 * Created by hammer on 2014/8/31.
 */
define(['angular'], function(angular){

    angular.module("job.controllers", ['job.services'])
        .controller('JobCreateCtrl', function($scope ,$element, $modal, Restangular, $injector){
            require(['modules/job/scripts/controllers/jobCreate'], function(jobCreate){
                $injector.invoke(jobCreate, this, {
                    '$scope': $scope,
                    '$element': $element,
                    '$modal': $modal,
                    'Restangular': Restangular
                });
            });
        })
        .controller('JobDetailCtrl', function($scope, $element, Restangular, ngTableParams, Utility, $injector){
            require(['modules/job/scripts/controllers/jobDetail'], function(jobDetail){
                $injector.invoke(jobDetail, this, {
                    '$scope': $scope,
                    '$element': $element,
                    'Restangular': Restangular,
                    'ngTableParams' : ngTableParams,
                    'Utility' : Utility
                });
            });
        })
        .controller('MainCtrl', function($scope, $element, $rootScope,$filter,Restangular,
                                         ngTableParams,signalRHubProxy,serviceUrl,Utility, $injector){
            $scope.filteredData = [];
            $scope.jobGridOptions = {
                data : 'filteredData',
                columnDefs: [{field:'JobName', displayName:'Product Name', width: "55%"},
                    {field:'Status.Status', displayName:'Last Build', width: "15%"},
                    {field:'Result', displayName:'Status', width: "15%"},
                    {field:'', displayName: 'Action', cellTemplate: 'modules/job/views/templates/jobTableActionCell.html', width: "*", sortable: false}],
                enableColumnReordering : true,
                enableColumnResize : true
            };
            require(['modules/job/scripts/controllers/main'], function(mainCtrl){
                $injector.invoke(mainCtrl, this, {
                    '$scope': $scope,
                    '$element': $element,
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