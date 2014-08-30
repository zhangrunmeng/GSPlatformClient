'use strict';

/**
 * @ngdoc directive
 * @name jobManagement.directive:mainPanel
 * @description
 * # mainPanel
 */
angular.module('jobManagement')
  .directive('mainPanel', function ($window,$timeout, Utility) {
    return {
      templateUrl: 'modules/jobManagement/views/main.html',
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
             var setHeight = leftPanel.height()>$window.innerHeight ? leftPanel.height() : $window.innerHeight;
             leftPanel.css('min-height',setHeight+'px');
             root.css('min-height',setHeight+'px');
             scope.jobTableHeight = (setHeight - 300) + "px";
          };

          angular.element($window).bind('resize',function(){
              adjustNavHeight();
              scope.onResize();
          });
          scope.$watch('$viewContentLoaded', function() {
              adjustNavHeight();
              scope.loadJobsData();
              scope.onResize();
          });

      }
    };
  });
