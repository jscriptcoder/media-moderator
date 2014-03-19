import Scope = require('../utils/scope');

/**
 * @class BaseDir
 * @extends Scope
 */
class BaseDir extends Scope {

    /**
     * Factory function that register and instantiate the class
     * @static
     */
    static factory: any = () => { return new BaseDir(); }

    /**
     * This directive is restricted to elements
     * @type String
     * @public
     */
    restrict = 'EA';

    /**
     * Linking function
     * @param {ng.IScope} scope
     * @param {JQuery} iElement
     * @param {ng.IAttributes} iAttrs
     * @public
     */
    link = (scope, iElement, iAttrs) => {};

}

export = BaseDir;