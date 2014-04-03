var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", './baseDir', '../services/loadingMask'], function(require, exports, BaseDir, LoadingMask) {
    /**
    * mt-loading-mask directive. Adds a spinner to the parent scope
    * @class MTLoadingMask
    * @extends BaseDir
    * @requires services/Utils
    */
    var MTLoadingMask = (function (_super) {
        __extends(MTLoadingMask, _super);
        /**
        * @constructor
        * @param {services/Utils} utils
        */
        function MTLoadingMask(utils) {
            var _this = this;
            _super.call(this);
            /**
            * This directive is restricted to elements
            * @type String
            * @public
            */
            this.restrict = 'E';
            /**
            * Template url
            * @type String
            * @public
            */
            this.templateUrl = 'mt-loading-mask.html';
            /**
            * Will replace the initial markup: <mt-loading-mask />
            * @type Boolean
            * @public
            */
            this.replace = true;
            /**
            * Linking function
            * @param {ng.IScope} scope
            * @param {JQuery} iElement
            * @param {ng.IAttributes} iAttrs
            * @public
            */
            this.link = function (scope, iElement, iAttrs) {
                var path = iAttrs.name || iAttrs.mtLoadingMask || 'loading', loadingMask = new LoadingMask(iElement);

                console.log('creating loading mask in', path);

                _this.__utils__.namespace(scope, path, loadingMask);

                if (iAttrs.start)
                    loadingMask.start();
            };
            this.__utils__ = utils;
        }
        MTLoadingMask.factory = ['utils', function (utils) {
                return new MTLoadingMask(utils);
            }];
        return MTLoadingMask;
    })(BaseDir);

    
    return MTLoadingMask;
});
