/**
 * Created by runmengz on 8/27/2014.
 */
angular.module('ngTableRenderer', ['ngTableX'])
    .directive('ngTableRenderer', function() {
        return {
            restrict: 'E',
            transclude: true,
            templateUrl: 'components/ng/common/ngTableRenderer/table.html'
        };
    });