import BaseCtrl = require('./baseCtrl');

/**
 * @cass MediaDetailCtrl
 * @extends BaseCtrl
 * @requires services/MediaWebserv
 */
class MediaDetailCtrl extends BaseCtrl {

    static $inject = [
        '$scope',
        '$rootScope',
        '$modalInstance',
        'mediaWebserv'
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
     * @param {ng.IScope} $rootScope
     * @param {bootstrap.ModalInstance} $modalInstance
     * @param {services/MediaWebserv} mediaWebserv
     * @constructor
     */
    constructor($scope, $rootScope, $modalInstance, mediaWebserv) {
        super($scope, 'mediaDetail');

        this.__$rootScope__ = $rootScope;
        this.__$modalInstance__ = $modalInstance;
        this.__mediaWebserv__ = mediaWebserv;

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


        var promise = this.__mediaWebserv__.setStatus({
            id: this.selected.Id,
            statusId: status.Status.Id
        });

        promise
            .then((resp) => { this.__statusSuccess__(resp, status) })
            .catch(this.__statusError__.bind(this))
    }

    /**
     * Gets triggered when we have a response from the server
     * @param {Object} resp
     * @param {Object} status
     * @event
     */
    __statusSuccess__(resp, status) {
        console.log('got response: ', resp);
        if (resp.status === 200) {
            this.__$modalInstance__.close({
                media: this.selected, 
                status: status
            });
        }
    }

    /**
     * Gets triggered when something when wrong in the server
     * @event
     */
    __statusError__() {
        console.error('there was an error trying to set the status');
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