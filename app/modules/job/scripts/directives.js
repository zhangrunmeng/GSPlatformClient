/**
 * Created by hammer on 2014/8/31.
 */
define(['angular',
        'modules/job/scripts/directives/customMenu'], function(
            angular,
            customMenu
        ){
            angular.module("job.directives", ['job.services'])
                .directive('mainPanel', function ($window,$timeout, Utility) {
                    return {
                        templateUrl: 'modules/job/views/main.html',
                        restrict: 'E',
                        /*controller:'MainCtrl',*/
                        link: function postLink(scope, element, attrs) {
                            // mode changed according window width , will trigger dynamic columns hide and show
                            scope.onResize= function (){
                                var jobsTable = angular.element("table[ng-Table='jobTableParams']");
                                var oldMode = scope.mode;
                                if(!jobsTable.width()){
                                    $timeout(scope.onResize, 100);
                                    return;
                                }
                                if(jobsTable.width()<320){
                                    scope.jobTableWidth = "15%,85%";
                                    scope.mode = Utility.ModeEnum.extraSmall;
                                } else if(jobsTable.width()<420) {
                                    scope.jobTableWidth = "15%,65%,20%";
                                    scope.mode = Utility.ModeEnum.small;
                                } else if(jobsTable.width()<630){
                                    scope.jobTableWidth = "10%,55%,15%,15%";
                                    scope.mode = Utility.ModeEnum.medium;
                                } else {
                                    scope.jobTableWidth = "55%,15%,15%,15%";
                                    scope.mode = Utility.ModeEnum.large;
                                }
                                if(angular.isDefined(oldMode) && scope.mode!=oldMode){
                                    scope.$apply();
                                }
                            };
                            // fix page navbar height
                            var adjustNavHeight = function(){
                                var leftPanel= angular.element("[role='aside']");
                                var root = angular.element('body');
                                var setHeight = leftPanel.height() > $window.innerHeight ? leftPanel.height() : $window.innerHeight;
                                leftPanel.css({'min-height' : 'calc(100% - 63px)', 'top' : '63px'});
                                root.css('min-height',setHeight+'px');
                                //scope.jobTableHeight = (setHeight - 350) + "px";
                            };

                            angular.element($window).bind('resize',function(){
                                adjustNavHeight();
                                //scope.onResize();
                                scope.$emit('resizeMainPanel');
                            });
                            scope.$watch('$viewContentLoaded', function() {
                                adjustNavHeight();
                                //scope.onResize();
                            });

                        }
                    };
                })
                .directive('customMenu', function(Utility, $injector){
                    return $injector.invoke(customMenu, this, {
                        'Utility' : Utility
                    });
                })
                .directive('jobDetail', function () {
                    return {
                        templateUrl: 'modules/job/views/partials/jobDetail.html',
                        restrict: 'E',
                        link: function postLink(scope, element, attrs) {
                            scope.scrollReport= function (){
                                var reportArea=  $('textarea[data-build=lastBuild]');
                                reportArea.animate({
                                    scrollTop:reportArea[0].scrollHeight - reportArea.height()
                                },2000);
                            };
                        }
                    };
                })
                .directive('customJobName', function (Restangular) {
                    return {
                        require:'ngModel',
                        restrict: 'A',
                        link: function postLink(scope, element, attrs,ngModelController) {


                            scope.$watch(function(){return ngModelController.$modelValue},function(newValue){
                                if(angular.isUndefined(newValue)){
                                    return;
                                }
                                console.log("customjobname:"+newValue);
                                Restangular.one("validation","custom").post('jobname',{"Input":newValue})
                                    .then(function(result){
                                        ngModelController.$setValidity('customJobName',   ( result['Type'] == 'ok' ) ? true : false);
                                    }
                                    ,function(error){
                                        ngModelController.$setValidity('customJobName',  false);
                                    });
                            });
                        }
                    };
                })
                .directive('uniqueJobName', function (Restangular) {
                    return {
                        require:'ngModel',
                        restrict: 'A',
                        link: function postLink(scope, element, attrs,ngModelController) {
                            scope.$watch(function(){return ngModelController.$modelValue},function(newValue){
                                if(angular.isUndefined(newValue)||!ngModelController.$error.customJobName){
                                    return;
                                }
                                console.log("uniquejobname:"+newValue);
                                Restangular.one("validation","jenkins").post("jobname",{"Input":newValue})
                                    .then(function(result){
                                        ngModelController.$setValidity('uniqueJobName', ( result['Type'] == 'ok' ) ? true : false);
                                    }
                                    ,function(error){
                                        console.log(error);
                                        ngModelController.$setValidity('uniqueJobName',  false);
                                    });
                            });
                        }
                    };
                })
                .directive('checkTiming', function (Restangular) {
                    return {
                        require:'ngModel',
                        restrict: 'A',
                        controller:'checkTimingCtrl',
                        link: function postLink(scope, element, attrs,ngModelController) {
                            scope.$watch(function(){return ngModelController.$modelValue},function(newValue,oldValue){
                                if(angular.isUndefined(oldValue)||angular.isUndefined(newValue)){
                                    return;
                                }
                                console.log("checkTiming:"+newValue);
                                Restangular.one("validation","jenkins").post('timing',{"Input":newValue})
                                    .then(function(result){
                                        scope.message = result['Message'];
                                        ngModelController.$setValidity('checkTiming',  ( result['Type'] == 'ok' ) ? true : false);
                                    }
                                    ,function(error){
                                        ngModelController.$setValidity('checkTiming',  false);
                                    });
                            });
                        }
                    };
                })
                .directive('fileRead', function () {
                    return {
                        template: '<i button class="fa fa-upload"></i><input type="file" class="hide">',

                        restrict: 'E',
                        link: function postLink(scope, element, attrs) {

                            scope.triggerUpload = function(event){

                                if(event.target==element.find('i')[0]){
                                    element.find('input[type=file]').trigger('click');
                                }
                            };
                            scope.changeConfigFile = function(event){
                                // var fileChoose = $(this);
                                if (window.File && window.FileReader && window.FileList && window.Blob) {
                                    var file = event.target.files[0];
                                    var reader = new FileReader();
                                    reader.onload = function(e){
                                        var contents = e.target.result;

                                        scope.$emit('changeConfigContent',contents);
                                        // fileChoose.prev().val(contents);
                                    }
                                    reader.readAsText(file);
                                } else {
                                    alert('The File APIs are not fully supported by your browser.');
                                }
                            };
                            element.find('i').bind('click',scope.triggerUpload);
                            element.find('input[type=file]').bind('change',scope.changeConfigFile);
                        }
                    };
                });

        });