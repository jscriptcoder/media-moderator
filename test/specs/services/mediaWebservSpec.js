define([
        '../../../build/js/services/mediaWebserv', 
        '../../../build/js/config'
    ], function(MediaWebserv, Config) {
    
    describe('services/mediaWebserv', function() {
        var mediaWebserv, $http;

        beforeEach(function() {
            $http = jasmine.createSpyObj('$http', ['get', 'put']);
            mediaWebserv = new MediaWebserv($http);
        });

        it('MediaWebserv#get', function() {
            mediaWebserv.get('data');
            expect($http.get).toHaveBeenCalledWith(Config.mediaApi, 'data', undefined);
        });

        it('MediaWebserv#setStatus', function() {
            mediaWebserv.setStatus('data');
            expect($http.put).toHaveBeenCalledWith(Config.statusChangeApi, 'data', jasmine.any(Object));
        });

        it('MediaWebserv#setStatusMulti', function() {
            mediaWebserv.setStatusMulti('data');
            expect($http.put).toHaveBeenCalledWith(Config.statusChangeMultiApi, 'data', jasmine.any(Object));
            expect($http.put.calls.mostRecent().args[2].headers['Content-Type']).toEqual('application/json; charset=UTF-8');
        });

    });
        
});