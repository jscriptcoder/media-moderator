define([
        '../../../build/js/services/statusWebserv', 
        '../../../build/js/config'
    ], function(StatusWebserv, Config) {
    
    describe('services/statusWebserv', function() {
        var statusWebserv, $http;

        beforeEach(function() {
            $http = jasmine.createSpyObj('$http', ['get']);
            statusWebserv = new StatusWebserv($http);
        });

        it('StatusWebserv#get', function() {
            statusWebserv.get('data');
            expect($http.get).toHaveBeenCalledWith(Config.statusApi, 'data', undefined);
        });

    });
        
});