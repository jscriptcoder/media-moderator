/**
* This module will hold all the services
* @module Services
*/
define(["require", "exports", 'config', './services/utils', './services/mediaWebserv', './services/statusWebserv', "angular"], function(require, exports, Config, Utils, MediaWebserv, StatusWebserv) {
    /**
    * @type ng.IModule
    * @private
    */
    var Services = angular.module(Config.appName + '.services', []);

    Services.value('utils', Utils).service('mediaWebserv', MediaWebserv).service('statusWebserv', StatusWebserv);
});
