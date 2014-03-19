/// <amd-dependency path="videojs"/>
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", './baseDir', "videojs"], function(require, exports, BaseDir) {
    /**
    * mt-media-video directive. Creates the DOM to presernt a video
    * @class MTMediaVideo
    * @extends BaseDir
    */
    var MTMediaVideo = (function (_super) {
        __extends(MTMediaVideo, _super);
        function MTMediaVideo() {
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
            this.templateUrl = 'mt-media-video.html';
            /**
            * Isolated scope
            * @type Object
            * @public
            */
            this.scope = {
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
            this.link = function (scope, iElement, iAttrs) {
            };
        }
        /**
        * Factory function that registers the directive
        * @static
        */
        MTMediaVideo.factory = function () {
            return new MTMediaVideo();
        };
        return MTMediaVideo;
    })(BaseDir);

    
    return MTMediaVideo;
});
