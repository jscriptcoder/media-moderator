/**
 * This module will hold all the services
 * @module Services
 */

/// <reference path="./typings/angular/angular.d.ts"/>
/// <amd-dependency path="angular"/>

import Config = require('config');
import Utils = require('./services/utils');
import MediaWebserv = require('./services/mediaWebserv');
import StatusWebserv = require('./services/statusWebserv');
import LoadingMask = require('./services/loadingMask');

/**
 * @type ng.IModule
 * @private
 */
var Services = angular.module(Config.appName + '.services', []);

Services
    .value('utils', Utils)
    .service('mediaWebserv', MediaWebserv)
    .service('statusWebserv', StatusWebserv)
    .service('loadingMask', LoadingMask)
;