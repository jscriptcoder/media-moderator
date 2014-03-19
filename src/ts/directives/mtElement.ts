import BaseDir = require('./baseDir');

/**
 * mt-element directive. Attaches the element to the current scope
 * @class MTElement
 * @extends BaseDir
 * @requires services/Utils
 */
class MTElement extends BaseDir {

    /**
     * Factory function that registers the directive
     * @static
     */
    static factory = ['utils', (utils) => { return new MTElement(utils) }];

    /**
     * This directive is restricted to attributes
     * @type String
     * @public
     */
    restrict = 'A';

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
        this.__utils__.namespace(scope, iAttrs.mtElement, iElement);
    };

}

export = MTElement;