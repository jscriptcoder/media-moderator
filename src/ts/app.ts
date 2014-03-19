/**
 * @module App
 */

/// <reference path="./typings/angular/angular.d.ts"/>
/// <amd-dependency path="angular"/>
/// <amd-dependency path="uiBootstrap"/>
/// <amd-dependency path="./services"/>
/// <amd-dependency path="./controllers"/>
/// <amd-dependency path="./directives"/>

import Config = require('./config');

/**
 * Main module for this app
 * @type ng.IModule
 * @memberof App
 */
export var module = angular.module(Config.appName, [

    Config.appName + '.services',
    Config.appName + '.controllers',
    Config.appName + '.directives',
    'ui.bootstrap',

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
export function init(el) {
    angular.element(el).ready(() => {
        angular.bootstrap(el, [module.name]);
    });
}