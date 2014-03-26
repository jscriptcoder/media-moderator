var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", './baseCtrl'], function(require, exports, BaseCtrl) {
    /**
    * @cass MediaDetailCtrl
    * @extends BaseCtrl
    * @requires boostrap-ui/$modalInstance
    */
    var MediaDetailCtrl = (function (_super) {
        __extends(MediaDetailCtrl, _super);
        /**
        * @param {ng.IScope} $scope
        * @param {bootstrap.ModalInstance} $modalInstance
        * @constructor
        */
        function MediaDetailCtrl($scope, $modalInstance) {
            var _this = this;
            _super.call(this, $scope, 'mediaDetail');
            /**
            * @type Object[]
            * @public
            */
            this.statuses = [];

            this.__$modalInstance__ = $modalInstance;

            // filters out the current status
            $scope.media.statuses.forEach(function (val, idx) {
                if (val.Status.Id !== $scope.media.statusId) {
                    _this.statuses.push(val);
                }
            });

            this.selected = $scope.media.getSelected();
        }
        /**
        * Happens when the user clicks on a status
        * @event
        * @param {Event} e
        * @param {Number} idx
        * @public
        */
        MediaDetailCtrl.prototype.statusClick = function (e, idx) {
            var status = this.statuses[idx];

            this.__$modalInstance__.close({
                media: this.selected,
                statusId: status.Status.Id
            });
        };

        /**
        * Cancel click
        * @event
        */
        MediaDetailCtrl.prototype.cancelClick = function () {
            console.log('closing overlay');
            this.__$modalInstance__.dismiss('cancel');
        };
        MediaDetailCtrl.$inject = [
            '$scope',
            '$modalInstance'
        ];
        return MediaDetailCtrl;
    })(BaseCtrl);

    
    return MediaDetailCtrl;
});
