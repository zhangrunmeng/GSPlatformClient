'use strict';

/**
 * @ngdoc function
 * @name stringDetectorWebClientAngularApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the stringDetectorWebClientAngularApp
 */
define(['angular'], function(angular){
    return function ($scope, $element, $rootScope,$filter,Restangular,ngTableParams,signalRHubProxy,serviceUrl,Utility) {
        var jobHubProxy = signalRHubProxy(serviceUrl,'jobHub',{logging:true});

        var FIX_CONTENT_ADJUST_HEIGHT = '56';

        $scope.onResize= function (){
            var jobsTable = $element.find("table[ng-Table='jobTableParams']");
            var contentDiv = $element.find('div[class="mail-apps-wrap"]');
            contentDiv.find("div[jobGridDiv]").css('height', contentDiv.height() - 220 + 'px');
            var oldMode = $scope.mode;
            if(!jobsTable.width()){
                //$timeout($scope.onResize, 100);
                return;
            }
            if(jobsTable.width()<320){
                $scope.jobTableWidth = "15%,85%";
                $scope.mode = Utility.ModeEnum.extraSmall;
            } else if(jobsTable.width()<420) {
                $scope.jobTableWidth = "15%,65%,20%";
                $scope.mode = Utility.ModeEnum.small;
            } else if(jobsTable.width()<630){
                $scope.jobTableWidth = "10%,55%,15%,15%";
                $scope.mode = Utility.ModeEnum.medium;
            } else {
                $scope.jobTableWidth = "55%,15%,15%,15%";
                $scope.mode = Utility.ModeEnum.large;
            }
            var height = contentDiv.height();
            $scope.jobTableHeight = (height - FIX_CONTENT_ADJUST_HEIGHT) + "px";
            if(angular.isDefined(oldMode) && $scope.mode != oldMode){
                $scope.$apply();
            }
            $scope.$broadcast('contentResize', {width : contentDiv.width(), height : height});
        };

        $scope.$on('resizeMainPanel',  $scope.onResize);

        $scope.filteredData = [];
        $scope.jobGridOptions = {
            data : 'filteredData',
            columnDefs: [{field:'JobName', displayName:'Product Name'}, {field:'Result', displayName:'Status'}]
        };

        // all kinds of category jobs count
        $scope.selectedCategory= Utility.defaultCategory;
        // category update
        $scope.$watch("selectedCategory", function () {
            if(angular.isDefined($scope.jobTableParams)){
                $scope.jobTableParams.reload();
            }
        });
        // init jobs data
        $scope.loadJobsData = function(){
            /*temp code for test local
            $scope.jobs = [];
            for(var i=0; i < 50; i++){
                $scope.jobs.push({
                    JobName : "test Job test Job test Job test Job test Job",
                    Status : {
                        Status : "Success"
                    },
                    Result : "Completed"
                });
            }
            $scope.jobTableParams = new ngTableParams(
                {
                    page:1, // first page number
                    count:25, // count per page
                    sorting: {
                        JobName:'asc'     // initial sorting
                    }
                },
                {
                    $scope:$scope,
                    showDefaultPagination:false,
                    counts: [], // hide the page size
                    getData: function($defer , params){
                        $scope.category = $filter('categoryCount')($scope.jobs);
                        var categoryData = $filter('jogCategoryFilter')($scope.jobs,$scope.selectedCategory);
                        var filteredData = $filter('objectOptionFilter')(categoryData,{JobName:"",Status:{Status:""},Result:""},$scope.jobFilter);
                        // set total item size
                        params.total(filteredData.length);
                        var orderedData = params.sorting() ?
                            $filter('orderBy')(filteredData, params.orderBy()) :
                            filteredData;
                        $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
                    }
                }
            );
            //$scope.onResize();


            //end of temp code*/


            Restangular.one('tools',Utility.ToolName).get({fields:'toolname,viewname,jobs(jobname,status)'})
                .then(function (toolData){
                    toolData.Jobs.forEach(function(job){
                        job.Result = Utility.BuildStatusMap[job.Status.Status];
                    });
                    $scope.jobs = toolData.Jobs.filter(function(job){
                        return job.JobName!= Utility.ValidationJob;
                    });
                    $scope.selectedJob= $scope.jobs[0];
                    angular.forEach($scope.jobs,function(job){
                       if(job.Result==Utility.running){
                           $scope.invokeFetchJobReport(job.JobName);
                       };
                    });
                },function(err){
                    console.log(err);
                }).then(function(){
                    // ng-table jobs table
                    /*
                    $scope.jobTableParams = new ngTableParams(
                        {
                            page:1, // first page number
                            count:25, // count per page
                            sorting: {
                                JobName:'asc'     // initial sorting
                            }
                        },
                        {   $scope:$scope,
                            showDefaultPagination:false,
                            counts: [], // hide the page size
                            getData: function($defer , params){
                                $scope.category = $filter('categoryCount')($scope.jobs);
                                var categoryData = $filter('jogCategoryFilter')($scope.jobs,$scope.selectedCategory);
                                var filteredData = $filter('objectOptionFilter')(categoryData,{JobName:"",Status:{Status:""},Result:""},$scope.jobFilter);
                                // set total item size
                                params.total(filteredData.length);
                                var orderedData = params.sorting() ?
                                    $filter('orderBy')(filteredData, params.orderBy()) :
                                    filteredData;
                                $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
                            }
                        }
                    );
                    //$scope.onResize();
                    */

                    $scope.category = $filter('categoryCount')($scope.jobs);
                    var categoryData = $filter('jogCategoryFilter')($scope.jobs,$scope.selectedCategory);
                    $scope.filteredData = $filter('objectOptionFilter')(categoryData,{JobName:"",Status:{Status:""}, Result:""},$scope.jobFilter);
                });
        };
        // a global filter for jobs
        $scope.jobFilter='';
        $scope.$watch("jobFilter", function () {
            if(angular.isDefined($scope.jobTableParams)){
                $scope.jobTableParams.reload();
            }
        });

        //sigle select job to show detail info
        $scope.isSelected = function(job){
            return $scope.selectedJob===job;
        };
        $scope.setSelected = function(job,$event){
            $scope.selectedJob =job;
        }
        // selected Job
        $scope.$watch('selectedJob',function(newValue,oldValue){
            if(angular.isUndefined(newValue)){
                return;
            }
            // the first time set value or new selection
            if(angular.isUndefined(oldValue)||newValue.JobName !=oldValue.JobName){
                $scope.$broadcast('beginJobLoad',newValue);
            }
        });

        // multple selections
        $scope.selections=[];
        $scope.toggleSelection = function(job){
            var index = $scope.selections.indexOf(job);
            if(index>-1){
                $scope.selections.splice(index,1);
            }else{
                $scope.selections.push(job);
            }
        };

        // on jobs table data reloaded
        $scope.$on('ngTableAfterReloadData',function(event,$data){
            /*if($data.length>0 && angular.isUndefined($scope.selectedJob)){
             $scope.selectedJob =$data[0];
             }*/
        });


        // create job call back
        $rootScope.$on('createNewJob',function(event,data){
            $scope.jobs.push(data);
            $scope.jobTableParams.reload();
        });

        // job setting update  call back
        $scope.$on('upstreamProjectSettingUpdate',function(event,upstreamProjectName,updateSetting,excludeJobName){
            $filter('filter')($scope.jobs,
                function(item){

                    if(angular.isUndefined(item.Setting)){
                        return false;
                    }
                    var shallUpdate =item.Setting.JobName==upstreamProjectName&&item.JobName!=excludeJobName;
                    if(shallUpdate){
                        item.Setting = updateSetting;
                    }
                    return shallUpdate;
                });
        });


        // top job tool bar
        $scope.jobStart = function(jobs){
            angular.forEach(jobs,function(job){
                Restangular.one('jobs',job.JobName).post('start',null,{fields:'status',realtime:true,connectionId:Utility.connectionId})
                    .then(function(jobData){

                        job.Status=jobData.Status;
                        job.Result=Utility.BuildStatusMap[job.Status.Status];
                        if(angular.isUndefined(job.Report)){
                            job.Report={JobName:job.JobName,Report:""};
                        }else{
                            job.Report.Report="";
                        }
                        $scope.invokeFetchJobReport(job.JobName);
                        $scope.selectedJob =job;
                        $scope.$broadcast('beginJobStart');
                        $scope.jobTableParams.reload();
                    });
            });
        };

        $scope.jobStop = function(jobs){
            angular.forEach(jobs,function(job){
                Restangular.one('jobs',job.JobName).one('stop').remove({fields:'status',realtime:true,connectionId:Utility.connectionId})
                    .then(function(jobData){
                        job.Status=jobData.Status;
                        job.Result=Utility.BuildStatusMap[job.Status.Status];
                        $scope.jobTableParams.reload();
                    });
            });
        };

        $scope.jobDelete = function(jobs) {
            angular.forEach(jobs,function(job){
                Restangular.one('jobs',job.JobName).remove({realtime:true,connectionId:Utility.connectionId})
                    .then(function(jobName){
                        var removeIndex= $scope.jobs.indexOf(job);
                        $scope.jobs.splice(removeIndex,1);
                        $scope.jobTableParams.reload();
                    });
            });
        };

        // fetch Job Report
        ///*
         $scope.invokeFetchJobReport = function(jobName){
            jobHubProxy.invoke('fetchJobReport',jobName);
         };
         jobHubProxy.on('appendReport',function(jobName,report){
             var updateJob=  $filter('filter')($scope.jobs,{JobName:jobName})[0];
             if(angular.isUndefined(updateJob.Report)){
                updateJob.Report={JobName:updateJob.JobName,Report:""};
             }
             updateJob.Report.Report+=report;
             if($scope.selectedJob.JobName==jobName){
                $scope.$broadcast('scrollReport');
             };

         });
         jobHubProxy.on('updateReportCallback',function(jobName){
         Restangular.one('jobs',jobName).get({fields:'builds,status,report'})
         .then(function(jobData){
         var updateJob= $filter('filter')($scope.jobs,{JobName:jobName})[0];
         updateJob.Status=jobData.Status;
         updateJob.Result=Utility.BuildStatusMap[jobData.Status.Status];
         if(angular.isDefined(updateJob.Builds)){
         // to prevent ng-table initial $data=null
         updateJob.Builds=jobData.Builds;
         }
         updateJob.Report=jobData.Report;
         $scope.$broadcast('afterJobStop');
         $scope.jobTableParams.reload();
         });
         });

         jobHubProxy.on('startJobCallBack',function(jobData){
         var job =$filter('filter')($scope.jobs,{JobName:jobData.JobName})[0];
         job.Status=jobData.Status;
         job.Result=Utility.BuildStatusMap[job.Status.Status];
         if(angular.isUndefined(job.Report)){
         job.Report={JobName:job.JobName,Report:""};
         }else{
         job.Report.Report="";
         }
         $scope.invokeFetchJobReport(job.JobName);
         if(job==$scope.selectedJob){
         $scope.$broadcast('beginJobStart');
         }
         $scope.jobTableParams.reload();
         });
         jobHubProxy.on('stopJobCallBack',function(jobData){
         var job =$filter('filter')($scope.jobs,{JobName:jobData.JobName})[0];
         job.Status=jobData.Status;
         job.Result=Utility.BuildStatusMap[job.Status.Status];
         $scope.jobTableParams.reload();
         });
         jobHubProxy.on('addJobCallBack',function(jobData){
         jobData.Result=Utility.BuildStatusMap[jobData.Status.Status];
         $scope.jobs.push(jobData);
         $scope.jobTableParams.reload();
         });
         jobHubProxy.on('deleteJobCallBack',function(jobName){
         var job =$filter('filter')($scope.jobs,{JobName:jobName})[0];
         var removeIndex= $scope.jobs.indexOf(job);
         $scope.jobs.splice(removeIndex,1);
         $scope.jobTableParams.reload();
         });
         //*/
        $scope.loadJobsData();
        $scope.onResize();
    }
});
