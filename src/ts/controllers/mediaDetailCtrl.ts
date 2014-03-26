import BaseCtrl = require('./baseCtrl');

/**
 * @cass MediaDetailCtrl
 * @extends BaseCtrl
 * @requires boostrap-ui/$modalInstance
 */
class MediaDetailCtrl extends BaseCtrl {

    static $inject = [
        '$scope',
        '$modalInstance'
    ]

    /**
     * @type Object[]
     * @public
     */
    statuses = [];

    /**
     * @type Object
     * @public
     */
    selected;

    /**
     * @type ng.IScope
     * @private
     */
    __$rootScope__;

    /**
     * @type bootstrap.ModalInstance
     * @private
     */
    __$modalInstance__;

    /**
     * @type MediaWebserv
     * @private
     */
    __mediaWebserv__;

    /**
     * @param {ng.IScope} $scope
     * @param {bootstrap.ModalInstance} $modalInstance
     * @constructor
     */
    constructor($scope, $modalInstance) {
        super($scope, 'mediaDetail');

        this.__$modalInstance__ = $modalInstance;

        // filters out the current status
        $scope.media.statuses.forEach((val, idx) => {
            if (val.Status.Id !== $scope.media.statusId) {
                this.statuses.push(val);
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
    statusClick(e, idx) {
        var status = this.statuses[idx];

        this.__$modalInstance__.close({
            media: this.selected,
            statusId: status.Status.Id
        });

    }

    /**
     * Cancel click
     * @event
     */
    cancelClick() {
        console.log('closing overlay');
        this.__$modalInstance__.dismiss('cancel');
    }

}

export = MediaDetailCtrl;