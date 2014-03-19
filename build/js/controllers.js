/**
* This module will hold all the controllers
* @module Controllers
*/
define(["require", "exports", 'config', './controllers/mainCtrl', './controllers/mediaListCtrl', './controllers/mediaDetailCtrl', './controllers/mediaPaginationCtrl', "angular"], function(require, exports, Config, MainCtrl, MediaListCtrl, MediaDetailCtrl, MediaPaginationCtrl) {
    //import UsersCtrl = require('./controllers/usersCtrl');
    //import UserDetailCtrl = require('./controllers/userDetailCtrl');
    /**
    * @type ng.IModule
    * @private
    */
    var Controllers = angular.module(Config.appName + '.controllers', []);

    // registers all the controllers
    Controllers.controller('mainCtrl', MainCtrl).controller('mediaListCtrl', MediaListCtrl).controller('mediaDetailCtrl', MediaDetailCtrl).controller('mediaPaginationCtrl', MediaPaginationCtrl);
});
