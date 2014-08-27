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

      }
    };
  });
