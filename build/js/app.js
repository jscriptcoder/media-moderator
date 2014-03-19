/**
* @module App
*/
define(["require", "exports", './config', "angular", "uiBootstrap", "./services", "./controllers", "./directives"], function(require, exports, Config) {
    /**
    * Main module for this app
    * @type ng.IModule
    * @memberof App
    */
    exports.module = angular.module(Config.appName, [
        Config.appName + '.services',
        Config.appName + '.controllers',
        Config.appName + '.directives',
        'ui.bootstrap'
    ]).config([
        '$sceProvider',
        function ($sceProvider) {
            $sceProvider.enabled(false);
        }
    ]);

    /**
    * Initializes the app
    * @memberof App
    */
    function init(el) {
        angular.element(el).ready(function () {
            angular.bootstrap(el, [exports.module.name]);
        });
    }
    exports.init = init;
});
