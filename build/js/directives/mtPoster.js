var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", './baseDir'], function(require, exports, BaseDir) {
    /**
    * mt-poster directive. Same as ng-src but for video tags
    * @class MTPoster
    * @extends BaseDir
    */
    var MTPoster = (function (_super) {
        __extends(MTPoster, _super);
        function MTPoster() {
            _super.apply(this, arguments);
            /**
            * This directive is restricted to attributes
            * @type String
            * @public
            */
            this.restrict = 'A';
            /**
            * Linking function
            * @param {ng.IScope} scope
            * @param {JQuery} iElement
            * @param {ng.IAttributes} iAttrs
            * @public
            */
            this.link = function (scope, iElement, iAttrs) {
                iElement.attr('poster', iAttrs.mtPoster);
            };
        }
        /**
        * Factory function that registers the directive
        * @static
        */
        MTPoster.factory = function () {
            return new MTPoster();
        };
        return MTPoster;
    })(BaseDir);

    
    return MTPoster;
});
