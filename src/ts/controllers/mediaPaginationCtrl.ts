import BaseCtrl = require('./baseCtrl');
import Config = require('../config');

/**
 * @cass MediaPaginationCtrl
 * @extends BaseCtrl
 */
class MediaPaginationCtrl extends BaseCtrl {

    /**
     * @type String[]
     * @static
     */
    static $inject = ['$scope', '$rootScope'];

    /**
     * @type Number
     * @public
     */
    totalMedia;

    /**
     * @type Number
     * @public
     */
    page = Config.firstPage;

    /**
     * @type Number
     * @public
     */
    pageSize = Config.pageSize;

    /**
     * @type Number
     * @public
     */
    groupSize = Config.pageGroupSize;

    /**
     * @type ng.IScope
     * @private
     */
    __$rootScope__;

    /**
     * @constructor
     * @param {ng.IScope} $scope
     * @param {ng.IScope} $rootScope
     */
    constructor($scope, $rootScope) {
        super($scope, 'paginator');

        this.__$rootScope__ = $rootScope;

        this.__listen__();
    }

    /**
     * Subscribe listeners to events
     * @private
     */
    __listen__() {
        this.__scope__.$on('statusChange', this.__statusChange__.bind(this));
        this.__scope__.$on('pageSizeChange', this.__pageSizeChange__.bind(this));
        this.__scope__.$on('totalMediaChange', this.__totalMediaChange__.bind(this));
        this.__scope__.$on('pageExternalChange', this.__pageExternalChange__.bind(this));
    }

    /**
     * It's triggered when the status changes
     * @event
     * @param {Event} e
     * @param {Number} statusId
     * @private
     */
    __statusChange__(e, statusId, numMedia) {
        console.log('MediaPaginationCtrl has heard of change of total media to', numMedia);
        this.totalMedia = numMedia;
        this.page = 1;
    }

    /**
     * It's triggered when the page size changes
     * @event
     * @param {Event} e
     * @param {Number} pageSize
     * @private
     */
    __pageSizeChange__(e, pageSize) {
        console.log('MediaPaginationCtrl has heard of a change of page size to', pageSize);
        this.pageSize = pageSize;
    }

    /**
     * It's triggered when the total of media changes
     * @event
     * @param {Event} e
     * @param {Number} numMedia
     * @private
     */
    __totalMediaChange__(e, numMedia) {
        console.log('MediaPaginationCtrl has heard of a change of total media to', numMedia);
        this.totalMedia = numMedia;
    }

    /**
     * Watches external page changes
     * @event
     * @param {Event} e
     * @param {Number} page
     * @private
     */
    __pageExternalChange__(e, page) {
        console.log('MediaPaginationCtrl has heard of a external change of page to', page);
        this.page = page;
    }

    /**
     * Triggers when the user clicks on the paginator
     * @event
     * @param {Number} page
     */
    pageClick(page) {
        this.__$rootScope__.$broadcast('pageChange', page);
    }

}

export = MediaPaginationCtrl;