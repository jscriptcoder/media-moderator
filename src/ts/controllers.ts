/**
 * This module will hold all the controllers
 * @module Controllers
 */

/// <reference path="./typings/angular/angular.d.ts"/>
/// <amd-dependency path="angular"/>

import Config = require('config');
import MainCtrl = require('./controllers/mainCtrl');
import MediaListCtrl = require('./controllers/mediaListCtrl');
import MediaDetailCtrl = require('./controllers/mediaDetailCtrl');
import MediaPaginationCtrl = require('./controllers/mediaPaginationCtrl');
//import UsersCtrl = require('./controllers/usersCtrl');
//import UserDetailCtrl = require('./controllers/userDetailCtrl');

/**
 * @type ng.IModule
 * @private
 */
var Controllers = angular.module(Config.appName + '.controllers', []);

// registers all the controllers
Controllers
    .controller('mainCtrl', MainCtrl)
    .controller('mediaListCtrl', MediaListCtrl)
    .controller('mediaDetailCtrl', MediaDetailCtrl)
    .controller('mediaPaginationCtrl', MediaPaginationCtrl)
    //.controller('userDetailCtrl', UserDetailCtrl)
    //.controller('usersCtrl', UsersCtrl)
;