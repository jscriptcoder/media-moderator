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
    * @requires services/MediaWebserv
    */
    var MediaDetailCtrl = (function (_super) {
        __extends(MediaDetailCtrl, _super);
        /**
        * @param {ng.IScope} $scope
        * @param {ng.IScope} $rootScope
        * @param {bootstrap.ModalInstance} $modalInstance
        * @param {services/MediaWebserv} mediaWebserv
        * @constructor
        */
        function MediaDetailCtrl($scope, $rootScope, $modalInstance, mediaWebserv) {
            var _this = this;
            _super.call(this, $scope, 'mediaDetail');
            /**
            * @type Object[]
            * @public
            */
            this.statuses = [];

            this.__$rootScope__ = $rootScope;
            this.__$modalInstance__ = $modalInstance;
            this.__mediaWebserv__ = mediaWebserv;

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
            var _this = this;
            var status = this.statuses[idx], data = 'id=' + this.selected.Id + '&statusId=' + status.Status.Id;

            this.__mediaWebserv__.setStatus({
                id: this.selected.Id,
                statusId: status.Status.Id
            }).then(function (resp) {
                _this.__statusSuccess__(resp, status);
            }).catch(this.__statusError__.bind(this));
        };

        /**
        * Gets triggered when we have a response from the server
        * @param {Object} resp
        * @param {Object} status
        * @event
        */
        MediaDetailCtrl.prototype.__statusSuccess__ = function (resp, status) {
            console.log('got response: ', resp);
            if (resp.status === 200) {
                this.__$modalInstance__.close({
                    media: this.selected,
                    status: status
                });
            }
        };

        /**
        * Gets triggered when something when wrong in the server
        * @event
        */
        MediaDetailCtrl.prototype.__statusError__ = function () {
            console.error('there was an error trying to set the status');
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
            '$rootScope',
            '$modalInstance',
            'mediaWebserv'
        ];
        return MediaDetailCtrl;
    })(BaseCtrl);

    
    return MediaDetailCtrl;
});
