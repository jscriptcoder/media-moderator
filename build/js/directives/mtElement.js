var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", './baseDir'], function(require, exports, BaseDir) {
    /**
    * mt-element directive. Attaches the element to the current scope
    * @class MTElement
    * @extends BaseDir
    * @requires services/Utils
    */
    var MTElement = (function (_super) {
        __extends(MTElement, _super);
        /**
        * @constructor
        * @param {services/Utils} utils
        */
        function MTElement(utils) {
            var _this = this;
            _super.call(this);
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
                _this.__utils__.namespace(scope, iAttrs.mtElement, iElement);
            };
            this.__utils__ = utils;
        }
        MTElement.factory = ['utils', function (utils) {
                return new MTElement(utils);
            }];
        return MTElement;
    })(BaseDir);

    
    return MTElement;
});
