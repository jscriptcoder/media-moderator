/// <amd-dependency path="videojs"/>

import BaseDir = require('./baseDir');

/**
 * mt-media-video directive. Creates the DOM to presernt a video
 * @class MTMediaVideo
 * @extends BaseDir
 */
class MTMediaVideo extends BaseDir {

    /**
     * Factory function that registers the directive
     * @static
     */
    static factory() { return new MTMediaVideo() }

    /**
     * This directive is restricted to attributes
     * @type String
     * @public
     */
    restrict = 'E';

    /**
     * Template url
     * @type String
     * @public
     */
    templateUrl = 'mt-media-video.html';

    /**
     * Isolated scope
     * @type Object
     * @public
     */
    scope = {
        url: '=',
        img: '='
    };

    /**
     * Linking function
     * @param {ng.IScope} scope
     * @param {JQuery} iElement
     * @param {ng.IAttributes} iAttrs
     * @public
     */
    link = (scope, iElement, iAttrs) => {

    };

}

export = MTMediaVideo; 