/// <reference path="../typings/angular/angular.d.ts"/>

/**
 * Simple wrapper for the loading element
 * @class LoadingMask
 */
class LoadingMask {

    /**
     * @type HTMLElement
     * @private
     */
    __$mask__;

    /**
     * @type HTMLElement
     * @private
     */
    __$parent__;

    /**
     * @constructor
     * @param {HTMLElement} mask
     */
    constructor(mask) {
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
    start() {
        var pw = this.__$parent__.css('width'),
            ph = this.__$parent__.css('height'),
            pz = parseInt(this.__$parent__.css('z-index'));

        this.__$mask__.css({
            //width: pw,
            //height: ph,
            zIndex: (pz ? pz : 0) + 10,
            display: 'block'
        });
    }

    /**
     * Hides the loading mask
     * @public
     */
    stop() {
        this.__$mask__.css('display', 'none');
    } 

}

export = LoadingMask;