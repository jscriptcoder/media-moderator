require.config({
        
    paths: {
            
        angular: '../bower_components/angular/angular',
        uiBootstrap: '../bower_components/angular-bootstrap/ui-bootstrap-tpls',
        jasmine: '../bower_components/jasmine/lib/jasmine-core/jasmine',
        jasmineHtml: '../bower_components/jasmine/lib/jasmine-core/jasmine-html',
        boot: '../bower_components/jasmine/lib/jasmine-core/boot',
        
    },
        
    shim: {
            
        angular: { exports: 'angular' },
        uiBootstrap: ['angular'],
        jasmine: { exports: 'jasmine'},
        jasmineHtml: ['jasmine'],
        boot: [ 'jasmine', 'jasmineHtml' ]
    }
});

require(['boot'], function() {
    
    require([
        
        // specs here
        'specs/services/utilsSpec',
        'specs/services/webserviceSpec',
        'specs/services/statusWebservSpec',
        'specs/services/mediaWebservSpec',
        'specs/services/loadingMaskSpec'
    
    ], window.onload);
    
});