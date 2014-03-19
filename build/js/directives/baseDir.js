var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", '../utils/scope'], function(require, exports, Scope) {
    /**
    * @class BaseDir
    * @extends Scope
    */
    var BaseDir = (function (_super) {
        __extends(BaseDir, _super);
        function BaseDir() {
            _super.apply(this, arguments);
            /**
            * This directive is restricted to elements
            * @type String
            * @public
            */
            this.restrict = 'EA';
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
        BaseDir.factory = function () {
            return new BaseDir();
        };
        return BaseDir;
    })(Scope);

    
    return BaseDir;
});
