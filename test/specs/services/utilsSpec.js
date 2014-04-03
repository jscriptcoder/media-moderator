define(['../../../build/js/services/utils'], function(Utils) {

    describe('services/utils', function() {

        it('Utils.isArray', function() {
            expect(Utils.isArray({})).toBeFalsy();
            expect(Utils.isArray([])).toBeTruthy();
        });

        it('Utils.isDefined', function() {
            var something;
            
            expect(Utils.isDefined(something)).toBeFalsy();

            something = 'something';

            expect(Utils.isDefined(something)).toBeTruthy();
        });

        it('Utils.isString', function() {
            expect(Utils.isString(4)).toBeFalsy();
            expect(Utils.isString('string')).toBeTruthy();
        });

        it('Utils.stripHtml', function() {
            expect(Utils.stripHtml('<p class="text">text</p>')).toEqual('text');
        });

        it('Utils.getUrlParam', function() {
            var url = 'http://www.example.com/?name=fran&age=35';
            expect(Utils.getUrlParam('name', url)).toEqual('fran');
            expect(Utils.getUrlParam('age', url)).toEqual('35');
        });

        it('Utils.getUrlHashtag', function() {
            var url = 'http://www.example.com/#something';
            expect(Utils.getUrlHashtag(url)).toEqual('something');
        });

        it('Utils.namespace', function() {
            Utils.namespace('path.to.module');
            expect(path.to.module).toBeDefined();
            
            Utils.namespace('path.to.another.module', { id: 'mod1' });
            expect(path.to.another.module).toBeDefined();
            expect(path.to.another.module.id).toEqual('mod1');
            
            var scope = {}
            Utils.namespace(scope, 'path.to.module');
            expect(scope.path.to.module).toBeDefined();
        });
    });

});