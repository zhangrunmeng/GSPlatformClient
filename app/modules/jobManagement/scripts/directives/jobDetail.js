'use strict';

/**
 * @ngdoc directive
 * @name jobManagement.directive:jobDetail
 * @description
 * # jobDetail
 */
angular.module('jobManagement')
  .directive('jobDetail', function () {
    return {
        templateUrl: 'modules/jobManagement/views/partials/jobDetail.html',
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
  });
