define(['../../../build/js/services/webservice'], function(Webservice) {
    
    describe('services/webservice', function() {
        var webserv, $http;

        beforeEach(function() {
            $http = jasmine.createSpyObj('$http', ['get', 'put', 'post', 'delete']);

            webserv = new Webservice($http);
            
            webserv.setApi({
                get : 'url/to/get',
                create: 'url/to/create',
                update: 'url/to/update',
                delete: 'url/to/delete',
            });
        });

        it('Webservice#setApi', function() {
            
            expect(webserv.api.get).toEqual(jasmine.any(Function));
            expect(webserv.api.create).toEqual(jasmine.any(Function));
            expect(webserv.api.update).toEqual(jasmine.any(Function));
            expect(webserv.api.delete).toEqual(jasmine.any(Function));

        });

        it('Webservice#api.method', function() {

            webserv.api.get();
            webserv.api.create('put');
            webserv.api.update('post', 'post');
            webserv.api.delete('delete', 'delete', 'options');
            
            expect($http.get).toHaveBeenCalledWith('url/to/get', undefined, undefined);
            expect($http.put).toHaveBeenCalledWith('url/to/create', undefined, undefined);
            expect($http.post).toHaveBeenCalledWith('url/to/update', 'post', undefined);
            expect($http.delete).toHaveBeenCalledWith('url/to/delete', 'delete', 'options');

        });

    });

});