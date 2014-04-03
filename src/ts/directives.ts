/**
 * This module will hold all the directives
 * @module Directives
 */

/// <reference path="./typings/angular/angular.d.ts"/>
/// <amd-dependency path="angular"/>

import Config = require('config');
import MTElement = require('./directives/mtElement');
import MTStatusList = require('./directives/mtStatusList');
import MTMediaControls = require('./directives/mtMediaControls');
import MTMediaImage = require('./directives/mtMediaImage');
import MTMediaVideo = require('./directives/mtMediaVideo');
import MTPoster = require('./directives/mtPoster');
import MTLoadingMask = require('./directives/mtLoadingMask');


/**
 * @type ng.IModule
 * @private
 */
var Directives = angular.module(Config.appName + '.directives', []);

Directives
    .directive('mtElement', MTElement.factory)
    .directive('mtStatusList', MTStatusList.factory)
    .directive('mtMediaControls', MTMediaControls.factory)
    .directive('mtMediaImage', MTMediaImage.factory)
    .directive('mtMediaVideo', MTMediaVideo.factory)
    .directive('mtPoster', MTPoster.factory)
    .directive('mtLoadingMask', MTLoadingMask.factory)
;