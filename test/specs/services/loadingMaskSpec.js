define([
        '../../../build/js/services/loadingMask', 
        'angular'
    ], function(LoadingMask, angular) {
    
    describe('services/loadingMask', function() {
        var loadingMask, parentEl, maskEl;

        beforeEach(function() {
            parentEl = document.createElement('div'),
            maskEl = document.createElement('div');

            parentEl.style.zIndex = 2;

            parentEl.appendChild(maskEl);
            
            loadingMask = new LoadingMask(maskEl);
        });

        it('new LoadingMask', function() {
            expect(parentEl.style.position).toEqual('relative');
        });

        it('LoadingMask#start', function() {
            loadingMask.start();
            expect(maskEl.style.zIndex).toEqual('12');
            expect(maskEl.style.display).toEqual('block');
        });
        
        it('LoadingMask#stop', function() {
            loadingMask.stop();
            expect(maskEl.style.display).toEqual('none');
        });

    });
        
});