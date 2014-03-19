import BaseDir = require('./baseDir');

/**
 * mt-media-image directive. Creates the DOM to presernt an image
 * @class MTMediaImage
 * @extends BaseDir
 */
class MTMediaImage extends BaseDir {

    /**
     * Factory function that registers the directive
     * @static
     */
    static factory() { return new MTMediaImage() }

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
    templateUrl = 'mt-media-image.html';

    /**
     * Isolated scope
     * @type Object
     * @public
     */
    scope = { url: '=' };

}

export = MTMediaImage;