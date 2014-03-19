var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", '../utils/scope'], function(require, exports, Scope) {
    /**
    * @class BaseCtrl
    * @extends Scope
    */
    var BaseCtrl = (function (_super) {
        __extends(BaseCtrl, _super);
        /**
        * @constructor
        * @param {ng.IScope} $scope
        * @param {String} [model]
        */
        function BaseCtrl($scope, model) {
            _super.call(this);
            this.__bridgeScope__($scope, model);
        }
        BaseCtrl.$inject = ['$scope'];
        return BaseCtrl;
    })(Scope);

    
    return BaseCtrl;
});
