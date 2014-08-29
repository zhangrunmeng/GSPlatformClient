/**
 * Created by runmengz on 8/27/2014.
 */
angular.module('ngTableRenderer', ['ngTableX'])
    .directive('ngTableRenderer', function($compile, $timeout) {

        var trim = function(value1, value2){
            return value1.substring(0, value1.indexOf("px")) - value2.substring(0, value2.indexOf("px"));
        }

        return {
            restrict: 'E',
            transclude: true,
            templateUrl: 'components/ng/common/ngTableRenderer/table.html',
            link :  function (scope, element, attrs) {
                var contentHeight = attrs.contentHeight;
                scope.$watch('attrs.contentHeight', function(value){
                    element.find("div[class='contentDiv']").css('height', value);
                }, true);

                scope.tableParams = element.find("table[ng-table]").attr('ng-table');
                element.find("div[class='contentDiv']").css('height', contentHeight);
                scope.$on('ngTableParamsChanged', function(event, tablescope){
                    if(scope.tableParams == tablescope.tableParams){
                        scope.tableScope = tablescope.scope;
                        scope.$on('ngTableAfterReloadData', function(){
                            var tablescope = scope.tableScope;
                            if(!angular.isUndefined(tablescope)){
                                var current =  angular.element(element.find("table[id='table-header'] thead tr")[0]).find("th").length;
                                if(current != tablescope.$columns.length){
                                    var headerTemplate = angular.element(document.createElement('thead')).attr('ng-include', 'templates.header');
                                    element.find("table[id='table-header']").append(headerTemplate);
                                    $compile(headerTemplate)(tablescope);
                                }
                                element.find("table[id!='table-header'] thead").remove();
                            }
                            $timeout(func, 0)
                        });
                    } else {
                        scope.$on('ngTableAfterReloadData', function(){
                        });
                    }
                });
                var func = function(){
                    var headtable = element.find("table[id='table-header']");
                    var ngtable = element.find("table[id!='table-header']");
                    headtable.attr('style', ngtable.attr('style'));
                    var columnes = angular.element(ngtable.find('tr')[0]).find('td');

                    angular.forEach(angular.element(headtable.find('tr')[0]).find('th'), function(th, idx){
                        th = angular.element(th);
                        if(!th.hasClass('ng-hide') && columnes[idx]){
                            var col = angular.element(columnes[idx]);
//                            var diff = 0;
//                            diff += trim(th.css("paddingLeft"),col.css("paddingLeft"));
//                            diff += trim(th.css("paddingRight"),col.css("paddingRight"));
//                            diff += trim(th.css("borderLeft"),col.css("borderLeft"));
//                            diff += trim(th.css("borderRight"),col.css("borderRight"));
                            th.css('width', col.width() + 'px');
                        }
                    });
                };
            }
        };
    });