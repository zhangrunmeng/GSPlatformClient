/**
 * Created by hammer on 2014/8/31.
 */
define(['angular',
       'restAngular',
       'uiBootstrap',
       'angularMessage',
       'angularGrid',
       'gf/common/ngTableRenderer/ngTableRenderer',
       './scripts/services',
       './scripts/controllers',
       './scripts/directives',
       './scripts/filters'
    ], function(angular){
        return angular
            .module('jobManagement', [
                'restangular',
                'ui.bootstrap',
                'ngMessages',
                'ngGrid',
                'ngTableRenderer',
                'job.controllers',
                'job.filters',
                'job.directives',
                'job.services'
            ]).constant('serviceUrl','http://vhwebdevserver.eng.citrite.net')
            .constant('serviceUrl2', "http://localhost:61586/")
            //http://vhwebdevserver.eng.citrite.net
            .config(function(RestangularProvider, serviceUrl){
                RestangularProvider.setBaseUrl(serviceUrl+'/api/');
            });
    });