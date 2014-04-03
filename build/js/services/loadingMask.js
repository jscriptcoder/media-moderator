/// <reference path="../typings/angular/angular.d.ts"/>
define(["require", "exports"], function(require, exports) {
    /**
    * Simple wrapper for the loading element
    * @class LoadingMask
    */
    var LoadingMask = (function () {
        /**
        * @constructor
        * @param {HTMLElement} mask
        */
        function LoadingMask(mask) {
            this.__$mask__ = angular.element(mask);
            this.__$parent__ = this.__$mask__.parent();

            var parentPos = this.__$parent__.css('position');

            if (!parentPos || parentPos === 'static') {
                this.__$parent__.css('position', 'relative');
            }
        }
        /**
        * Shows the loading mask
        * @public
        */
        LoadingMask.prototype.start = function () {
            var pw = this.__$parent__.css('width'), ph = this.__$parent__.css('height'), pz = parseInt(this.__$parent__.css('z-index'));

            this.__$mask__.css({
                //width: pw,
                //height: ph,
                zIndex: (pz ? pz : 0) + 10,
                display: 'block'
            });
        };

        /**
        * Hides the loading mask
        * @public
        */
        LoadingMask.prototype.stop = function () {
            this.__$mask__.css('display', 'none');
        };
        return LoadingMask;
    })();

    
    return LoadingMask;
});
