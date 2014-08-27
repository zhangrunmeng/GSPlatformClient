'use strict';

/**
 * @ngdoc filter
 * @name jobManagement.filter:categoryCount
 * @function
 * @description
 * # categoryCount
 * Filter in the jobManagement.
 */
angular.module('jobManagement')
  .filter('categoryCount', function (Utility) {
    return function (array) {
        var category  ={
            totalJobsNum:0,
            createdJobsNum:0,
            runningJobsNum:0,
            completedJobsNum:0
        };
        if (!angular.isArray(array)) return category;
        category.totalJobsNum = array.length;
        for ( var j = 0; j < array.length; j++) {
            var job = array[j];
            if(angular.isUndefined(job.Result)){
                return category;
            }
            switch (job.Result ) {
                case Utility.created:
                    category.createdJobsNum++;
                    break;
                case Utility.running:
                    category.runningJobsNum++;
                    break;
                case Utility.completed :
                    category.completedJobsNum++;
                    break;
            }
        }
        return category;
    };
  });
