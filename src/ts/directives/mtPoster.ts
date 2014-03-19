import BaseDir = require('./baseDir');

/**
 * mt-poster directive. Same as ng-src but for video tags
 * @class MTPoster
 * @extends BaseDir
 */
class MTPoster extends BaseDir {

    /**
     * Factory function that registers the directive
     * @static
     */
    static factory() { return new MTPoster(); }

    /**
     * This directive is restricted to attributes
     * @type String
     * @public
     */
    restrict = 'A';

    /**
     * Linking function
     * @param {ng.IScope} scope
     * @param {JQuery} iElement
     * @param {ng.IAttributes} iAttrs
     * @public
     */
    link = (scope, iElement, iAttrs) => { iElement.attr('poster', iAttrs.mtPoster) };

}

export = MTPoster;