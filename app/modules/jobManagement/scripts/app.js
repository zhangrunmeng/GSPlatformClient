'use strict';

/**
 * @ngdoc overview
 * @name stringDetectorWebClientAngularApp
 * @description
 * # stringDetectorWebClientAngularApp
 *
 * Main module of the application.
 */
angular
    .module('jobManagement', [
        'restangular','ngTableRenderer','tableScrollWatcher', 'ui.bootstrap', 'ngMessages'
    ]).constant('serviceUrl','http://vhwebdevserver.eng.citrite.net')
    .config(function(RestangularProvider, serviceUrl){
        RestangularProvider.setBaseUrl(serviceUrl+'/api/');
    });

angular.module('jobManagement')
    .factory('Utility',function(){
        // job status
        var all='All';
        var running="Running";
        var created="Created";
        var completed="Completed";
        var validationJobName ='validation';
        var toolName ='faketool';
        // jenkins ball color  map
        var buildStatusMap ={"Failed":completed,
            "InProgress":running,
            "Unstable":completed,
            "Success":completed,
            "Pending":completed,
            "Disabled":completed,
            "Aborted":completed,
            "NotBuilt":created
        };

        // menu option
        var menuOption ={
            accordion : 'true',
            speed : 200,
            closedSign : '[+]',
            openedSign : '[-]'
        };

        // tab name
        var settingTab='settingTab';
        var configureTab ='configureTab';
        var historyTab ='historyTab';
        var reportTab ='reportTab';

        // scm Type
        var gitScmType ='StringDetectorService.ReqResModel.GitSettingDto, StringDetectorService';
        var svnScmType ='StringDetectorService.ReqResModel.SVNSettingDto, StringDetectorService';
        var perforceScmType ='StringDetectorService.ReqResModel.PerforceSettingDto, StringDetectorService';

        var modeEnum={extraSmall:0,small:1,medium:2,large:3}
        return {

            BuildStatusMap : buildStatusMap,
            ValidationJob  : validationJobName,
            ToolName : toolName,
            MenuOption : menuOption,
            ModeEnum: modeEnum,
            created: created,
            running:running,
            completed:completed,
            all:all,
            defaultCategory: all,
            settingTab : settingTab,
            historyTab : historyTab,
            configureTab: configureTab,
            reportTab: reportTab,
            gitScmType:gitScmType,
            svnScmType:svnScmType,
            perforceScmType:perforceScmType


        };
    });