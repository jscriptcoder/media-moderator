/// <reference path="./typings/require/require.d.ts"/>
// RequireJS basic configuration
require.config({
    baseUrl: '/Frontend/build/js',
    paths: {
        angular: '/Frontend/bower_components/angular/angular',
        uiBootstrap: '/Frontend/bower_components/angular-bootstrap/ui-bootstrap-tpls',
        videojs: '/Frontend/bower_components/video.js/video'
    },
    shim: {
        angular: { exports: 'angular' },
        uiBootstrap: ['angular'],
        videojs: { exports: 'videojs' }
    }
});

// Let's kick off the app
require([
    './app'
], function (app) {
    app.init(document);
});
