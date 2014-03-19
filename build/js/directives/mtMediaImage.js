var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", './baseDir'], function(require, exports, BaseDir) {
    /**
    * mt-media-image directive. Creates the DOM to presernt an image
    * @class MTMediaImage
    * @extends BaseDir
    */
    var MTMediaImage = (function (_super) {
        __extends(MTMediaImage, _super);
        function MTMediaImage() {
            _super.apply(this, arguments);
            /**
            * This directive is restricted to attributes
            * @type String
            * @public
            */
            this.restrict = 'E';
            /**
            * Template url
            * @type String
            * @public
            */
            this.templateUrl = 'mt-media-image.html';
            /**
            * Isolated scope
            * @type Object
            * @public
            */
            this.scope = { url: '=' };
        }
        /**
        * Factory function that registers the directive
        * @static
        */
        MTMediaImage.factory = function () {
            return new MTMediaImage();
        };
        return MTMediaImage;
    })(BaseDir);

    
    return MTMediaImage;
});
