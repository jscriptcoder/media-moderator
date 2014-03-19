/**
* This module will hold all the directives
* @module Directives
*/
define(["require", "exports", 'config', './directives/mtElement', './directives/mtStatusList', './directives/mtMediaControls', './directives/mtMediaImage', './directives/mtMediaVideo', './directives/mtPoster', "angular"], function(require, exports, Config, MTElement, MTStatusList, MTMediaControls, MTMediaImage, MTMediaVideo, MTPoster) {
    /**
    * @type ng.IModule
    * @private
    */
    var Directives = angular.module(Config.appName + '.directives', []);

    Directives.directive('mtElement', MTElement.factory).directive('mtStatusList', MTStatusList.factory).directive('mtMediaControls', MTMediaControls.factory).directive('mtMediaImage', MTMediaImage.factory).directive('mtMediaVideo', MTMediaVideo.factory).directive('mtPoster', MTPoster.factory);
});
