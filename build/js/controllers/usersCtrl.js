var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", './baseCtrl'], function(require, exports, BaseCtrl) {
    /**
    * @cass UsersCtrl
    * @extends BaseCtrl
    */
    var UsersCtrl = (function (_super) {
        __extends(UsersCtrl, _super);
        /**
        * @param {ng.IScope} $scope
        * @constructor
        */
        function UsersCtrl($scope) {
            _super.call(this, $scope, 'users');
        }
        return UsersCtrl;
    })(BaseCtrl);

    
    return UsersCtrl;
});
