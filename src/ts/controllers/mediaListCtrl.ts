import BaseCtrl = require('./baseCtrl');
import Config = require('../config');

/**
 * @cass MediaCtrl
 * @extends BaseCtrl
 * @requires ng/$rootScope
 * @requires bootstrap-ui/$modal
 * @requires services/MediaWebserv
 */
class MediaCtrl extends BaseCtrl {

    /**
     * @type String[]
     * @static
     */
    static $inject = [
        '$scope',
        '$rootScope',
        '$modal',
        'mediaWebserv'
    ];

    /**
     * List of media
     * @type Object[]
     * @public
     */
    list = [];

    /**
     * Keeps track of the video selected
     * @type Number
     * @public
     */
    selected;

    /**
     * list of statuses
     * @type Object[]
     * @public
     */
    statuses = [];

    /**
     * @type Number
     * @public
     */
    statusId;

    /**
     * @type Number
     * @public
     */
    orderId = Config.orderBy;

    /**
     * @type String
     * @public
     */
    search;

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
     * @type ng.IScope
     * @private
     */
    __$rootScope__;

    /**
     * @type bootstrap.Modal
     * @private
     */
    __$modal__;

    /**
     * @type MediaWebserv
     * @private
     */
    __mediaWebserv__;

    /**
     * @param {ng.IScope} $scope
     * @param {ng.IScope} $rootScope
     * @param {bootstrap.Modal} $modal
     * @param {services/MediaWebserv} mediaWebserv
     * @constructor
     */
    constructor($scope, $rootScope, $modal, mediaWebserv) {
        super($scope, 'media');

        this.__$rootScope__ = $rootScope;
        this.__$modal__ = $modal;
        this.__mediaWebserv__ = mediaWebserv;

        this.__listen__();
    }

    /**
     * Subscribe listeners to events
     * @private
     */
    __listen__() {
        // let's subscribe to these events
        this.__scope__.$on('statusesReady', this.__statusesReady__.bind(this));
        this.__scope__.$on('statusChange', this.__statusChange__.bind(this));
        this.__scope__.$on('orderChange', this.__orderChange__.bind(this));
        this.__scope__.$on('pageSizeChange', this.__pageSizeChange__.bind(this));
        this.__scope__.$on('newSearch', this.__newSearch__.bind(this));
        this.__scope__.$on('pageChange', this.__pageChange__.bind(this));
    }

    /**
     * Makes a request for media
     * @private
     */
    __request__() {

        var params: any = {
                $orderby: this.orderId,
                $skip: (this.page - 1) * this.pageSize,
                $top: this.pageSize,
                $filter: "StatusId eq " + this.statusId// + " and ItemType eq 'video'"
            };

        if (this.search) params.search = this.search;

        console.log('requesting media with', params);

        this.__mediaWebserv__.get({ params: params })
            .then(this.__mediaSuccess__.bind(this))
            .catch(this.__mediaError__.bind(this))
    }

    /**
     * Indicates whether or not we're ready to request media
     * @returns {Boolean}
     * @private
     */
    __readyToRequest__() {
        return this.statusId !== null &&
            this.orderId !== null &&
            this.pageSize !== null &&
            this.search !== null &&
            this.page != null;
    }

    /**
     * It's triggered when we get statuses from the server
     * @event
     * @param {Event} e
     * @param {Object[]} statuses
     * @private
     */
    __statusesReady__(e, statuses) {
        this.statuses = statuses;
    }

    /**
     * It's triggered when the status changes
     * @event
     * @param {Event} e
     * @param {Number} statusId
     * @private
     */
    __statusChange__(e, statusId) {
        console.log('MediaCtrl has heard of a change of status', statusId);
        this.statusId = statusId;
        if (this.__readyToRequest__()) this.__request__();
    }

    /**
     * It's triggered when the order changes
     * @event
     * @param {Event} e
     * @param {Number} orderId
     * @private
     */
    __orderChange__(e, orderId) {
        console.log('MediaCtrl has heard of a chage of order', orderId);
        this.orderId = orderId;
        if (this.__readyToRequest__()) this.__request__();
    }

    /**
     * It's triggered when the page size changes
     * @event
     * @param {Event} e
     * @param {Number} pageSize
     * @private
     */
    __pageSizeChange__(e, pageSize) {
        console.log('MediaCtrl has heard of a change of page size', pageSize);
        this.pageSize = pageSize;
        if (this.__readyToRequest__()) this.__request__();
    }

    /**
     * It's triggered when search query changes
     * @event
     * @param {Event} e
     * @param {String} search
     * @private
     */
    __newSearch__(e, search) {
        console.log('MediaCtrl has heard of a new search', search);
        this.search = search;
        if (this.__readyToRequest__()) this.__request__();
    }

    /**
     * It's triggered when the page changes
     * @event
     * @param {Event} e
     * @param {Number} page
     * @private
     */
    __pageChange__(e, page) {
        console.log('MediaCtrl has heard of a page change', page);
        this.page = page;
        if (this.__readyToRequest__()) this.__request__();
    }

    /**
     * Gets triggered when we have a response from the server
     * @param {Object} resp
     * @event
     */
    __mediaSuccess__(resp) {
        console.log('got response: ', resp);
        if (resp.status === 200 && resp.data) {
            this.list = resp.data.Results;
        }
    }

    /**
     * Gets triggered when something when wrong in the server
     * @event
     */
    __mediaError__() {
        console.error('there was an error trying to get media');
    }

    /**
     * Happens when the user clicks on a media
     * @event
     * @param {Event} e
     * @param {Number} idx
     * @public
     */
    mediaClick(e, idx) {
        e.preventDefault();
        console.log('media clicked on: ', this.list[idx]);

        this.selected = idx;

        this.__$modal__.open({
            templateUrl: 'media-detail.html',
            controller: 'mediaDetailCtrl',
            scope: this.__scope__
        })
            .result.then(this.__onMediaDetailClose__.bind(this));

    }

    /**
     * This method is called when the user closes the overlay by changing the status of the media
     * @event
     * @param {Object} result
     * @private
     */
    __onMediaDetailClose__(result) {
        // let's update status counts
        result.status.Count++;

        this.__request__();
    }

    /**
     * @type Object
     * @public
     */
    getSelected() {
        if (this.selected >= 0) {
            return this.list[this.selected];
        } else {
            return null;
        }
    }

    /**
     * @type String
     * @public
     */
    getIconByType(item) {
        return item === 'image' ? 'glyphicon-picture' : 'glyphicon-facetime-video';
    }

}

export = MediaCtrl;
