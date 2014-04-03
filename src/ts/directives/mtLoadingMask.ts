import BaseDir = require('./baseDir');
import LoadingMask = require('../services/loadingMask');
/**
 * mt-loading-mask directive. Adds a spinner to the parent scope
 * @class MTLoadingMask
 * @extends BaseDir
 * @requires services/Utils
 */
class MTLoadingMask extends BaseDir {

    /**
     * Factory function that registers the directive
     * @static
     */
    static factory = ['utils', (utils) => { return new MTLoadingMask(utils) }]; 

    /**
     * This directive is restricted to elements
     * @type String
     * @public
     */
    restrict = 'E';

    /**
     * Template url
     * @type String
     * @public
     */
    templateUrl = 'mt-loading-mask.html';

    /**
     * Will replace the initial markup: <mt-loading-mask />
     * @type Boolean
     * @public
     */
    replace = true;

    /**
     * @type services/Utils
     * @private
     */
    __utils__;

    /**
     * @constructor
     * @param {services/Utils} utils
     */
    constructor(utils) {
        super();
        this.__utils__ = utils;
    }

    /**
     * Linking function
     * @param {ng.IScope} scope
     * @param {JQuery} iElement
     * @param {ng.IAttributes} iAttrs
     * @public
     */
    link = (scope, iElement, iAttrs) => {
        var path = iAttrs.name || iAttrs.mtLoadingMask || 'loading',
            loadingMask = new LoadingMask(iElement);

        console.log('creating loading mask in', path);

        this.__utils__.namespace(scope, path, loadingMask);

        if (iAttrs.start) loadingMask.start();
    };

}

export = MTLoadingMask; 