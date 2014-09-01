/**
 * Created by hammer on 2014/8/31.
 */
define(['angular',
       'restAngular',
       'uiBootstrap',
       'angularMessage',
       'angularGrid',
       'signalR',
       'gf/common/ngTableRenderer/ngTableRenderer',
       'modules/job/scripts/services',
       'modules/job/scripts/controllers',
       'modules/job/scripts/directives',
       'modules/job/scripts/filters'
    ], function(angular){
        return angular
            .module('jobManagement', [
                'restangular',
                'ui.bootstrap',
                'ngMessages',
                'ngGrid',
                'ngTableRenderer',
                'job.services',
                'job.controllers',
                'job.filters',
                'job.directives'
            ]).constant('serviceUrl','http://vhwebdevserver.eng.citrite.net')
            .config(function(RestangularProvider, serviceUrl){
                RestangularProvider.setBaseUrl(serviceUrl+'/api/');
            });
    });