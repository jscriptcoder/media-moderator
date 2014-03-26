import BaseCtrl = require('./baseCtrl');
import Config = require('../config');
import BetterObject = require('../utils/betterObject');

/**
 * @cass MediaCtrl
 * @extends BaseCtrl
 * @requires ng/$rootScope
 * @requires bootstrap-ui/$modal
 * @requires services/MediaWebserv
 * @requires utils/BetterObject
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
     * @type BetterObject
     * @public
     */
    multiselected = new BetterObject;

    /**
     * list of statuses
     * @type BetterObject
     * @public
     */
    statuses = new BetterObject;

    /**
     * @type Number
     * @public
     */
    statusId;

    /**
     * Contains some extra info we'll need for the UI, based on the status
     * @type Object
     * @public
     */
    extra = {};

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

        var promise = this.__mediaWebserv__.get({ params: params });

        promise
            .then(this.__mediaSuccess__.bind(this))
            .catch(this.__mediaError__.bind(this))
        ;
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
        statuses.forEach((status) => this.statuses.set(status.Status.Id, status) );
    }

    /**
     * It's triggered when the status changes
     * @event
     * @param {Event} e
     * @param {Object} status
     * @private
     */
    __statusChange__(e, status) {
        console.log('MediaCtrl has heard of a change of status to', status);

        this.statusId = status.Status.Id;
        this.extra = status.extra;
        this.page = 1;
        this.multiselected.empty();

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
        console.log('MediaCtrl has heard of a chage of order to', orderId);
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
        console.log('MediaCtrl has heard of a change of page size to', pageSize);
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
        console.log('MediaCtrl has heard of a new search:', search);
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
        console.log('MediaCtrl has heard of a page change to', page);
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
        console.log('media clicked on:', this.list[idx]);

        this.selected = idx;

        var $modalInstance = this.__$modal__.open({
            templateUrl: 'media-detail.html',
            controller: 'mediaDetailCtrl',
            scope: this.__scope__
        })

        $modalInstance.result.then(this.__onMediaDetailClose__.bind(this));

    }

    /**
     * Will change the status of this media
     * @param {Object} media
     * @param {Number} statusId
     * @private
     */
    __changeStatus__(media, statusId) {
        var newStatus = this.statuses[statusId],
            oldStatus = this.statuses[media.StatusId];

        console.log('new status:', newStatus, ', old status:', oldStatus)

        var promise = this.__mediaWebserv__.setStatus({
            id: media.Id,
            statusId: statusId
        });

        promise
            .then((resp) => { this.__statusSuccess__(resp, newStatus, oldStatus) })
            .catch(this.__statusError__.bind(this))

    }

    /**
     * This method is called when the user closes the overlay by changing the status of the media
     * @event
     * @param {Object} result
     * @private
     */
    __onMediaDetailClose__(result) {
        this.__changeStatus__(result.media, result.statusId);        
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
        return item === 'image' ? Config.clsIcoPicture : Config.clsIcoVideo;
    }

    /**
     * Builds the url that link to the user based on the username
     * @type String
     * @public
     */
    getUserUrl(username) {
        return Config.urlProvider + username;
    }

    /**
     * Happens when the user clicks on a status change
     * @event
     * @param {Object} media
     * @param {Number} statusId
     * @public
     */
    statusClick(media, statusId) {
        this.__changeStatus__(media, statusId);
    }

    /**
     * Gets triggered when we have a response from the server
     * @param {Object} resp
     * @param {Object} newStatus
     * @param {Object} oldStatus
     * @event
     */
    __statusSuccess__(resp, newStatus, oldStatus) {
        console.log('got response: ', resp);
        if (resp.status === 200) {

            // let's update status counts
            newStatus.Count++;
            oldStatus.Count--;

            this.__$rootScope__.$broadcast('totalMediaChange', oldStatus.Count);

            if (this.list.length > 1) {
                // there are still media in this page
                this.__request__();
            } else if (this.page > 1) {
                // no media left in this page, let's go to the previous one
                this.__$rootScope__.$broadcast('pageExternalChange', --this.page);
                this.__request__();
            } else {
                // last media with current status. Let's remove it from the list
                this.list.pop();
            }

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
     * Happens when the user clicks on multiselection checkbox.
     * It'll add or remove an item from the multiselected list
     * @event
     * @param {Object} media
     * @public
     */
    multiselectClick(media) {

        media.checked = !media.checked;
        if (media.checked) {
            this.multiselected.set(media.Id, media);
        } else { 
            this.multiselected.del(media.Id);
        }
        
        console.log('media multiselection', this.multiselected.__order__);

        this.__$rootScope__.$broadcast('multiselectedMediaClick', media, this.multiselected, this.extra, this.statuses);
    }

}

export = MediaCtrl;
