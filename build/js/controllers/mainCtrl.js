var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", './baseCtrl'], function(require, exports, BaseCtrl) {
    /**
    * @cass MainCtrl
    * @extends BaseCtrl
    */
    var MainCtrl = (function (_super) {
        __extends(MainCtrl, _super);
        /**
        * @param {ng.IScope} $scope
        * @constructor
        */
        function MainCtrl($scope) {
            _super.call(this, $scope, 'main');
        }
        return MainCtrl;
    })(BaseCtrl);

    
    return MainCtrl;
});
