/**
 * Created by runmengz on 8/27/2014.
 */
angular.module('ngTableRenderer', ['ngTableX'])
    .directive('ngTableRenderer', function($compile) {

        var trim = function(value){
            return value.substring(0, value.indexOf("px"));
        }

        return {
            restrict: 'E',
            transclude: true,
            templateUrl: 'components/ng/common/ngTableRenderer/table.html',
            link :  function (scope, element, attrs) {
                var contentHeight = attrs.contentHeight;
                element.find("div[class='contentDiv']").css('height', contentHeight);
                var tableParams = attrs.ngTableParams;
                scope.$watch(tableParams + '.settings().scope', function(newvalue){
                   if(!angular.isUndefined(newvalue)){
                       var headerTemplate = angular.element(document.createElement('thead')).attr('ng-include', 'templates.header');
                       element.find("table[id='table-header']").append(headerTemplate);
                       $compile(headerTemplate)(newvalue);
                       element.find("table[id!='table-header']").find('thead').remove();
                   }
                });
                scope.$on('ngTableAfterReloadData', function(){
                    var headtable = element.find("table[id='table-header']");
                    var ngtable = element.find("table[id!='table-header']");
                    headtable.attr('style', ngtable.attr('style'));
                    var columnes = angular.element(ngtable.find('tr')[0]).find('td');
                    angular.forEach(angular.element(headtable.find('tr')[0]).find('th'), function(th, idx){
                        th = angular.element(th);
                        if(!th.hasClass('ng-hide') && columnes[idx]){
                            th.css('width', angular.element(columnes[idx]).width() - trim(th.css("paddingLeft")) - trim(th.css("paddingRight")) + 'px');
                        }
                    });
                });
            }
        };
    });