var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", './baseCtrl', '../config'], function(require, exports, BaseCtrl, Config) {
    /**
    * @cass MediaCtrl
    * @extends BaseCtrl
    * @requires ng/$rootScope
    * @requires bootstrap-ui/$modal
    * @requires services/MediaWebserv
    */
    var MediaCtrl = (function (_super) {
        __extends(MediaCtrl, _super);
        /**
        * @param {ng.IScope} $scope
        * @param {ng.IScope} $rootScope
        * @param {bootstrap.Modal} $modal
        * @param {services/MediaWebserv} mediaWebserv
        * @constructor
        */
        function MediaCtrl($scope, $rootScope, $modal, mediaWebserv) {
            _super.call(this, $scope, 'media');
            /**
            * List of media
            * @type Object[]
            * @public
            */
            this.list = [];
            /**
            * list of statuses
            * @type Object[]
            * @public
            */
            this.statuses = [];
            /**
            * @type Number
            * @public
            */
            this.orderId = Config.orderBy;
            /**
            * @type Number
            * @public
            */
            this.page = Config.firstPage;
            /**
            * @type Number
            * @public
            */
            this.pageSize = Config.pageSize;

            this.__$rootScope__ = $rootScope;
            this.__$modal__ = $modal;
            this.__mediaWebserv__ = mediaWebserv;

            this.__listen__();
        }
        /**
        * Subscribe listeners to events
        * @private
        */
        MediaCtrl.prototype.__listen__ = function () {
            // let's subscribe to these events
            this.__scope__.$on('statusesReady', this.__statusesReady__.bind(this));
            this.__scope__.$on('statusChange', this.__statusChange__.bind(this));
            this.__scope__.$on('orderChange', this.__orderChange__.bind(this));
            this.__scope__.$on('pageSizeChange', this.__pageSizeChange__.bind(this));
            this.__scope__.$on('newSearch', this.__newSearch__.bind(this));
            this.__scope__.$on('pageChange', this.__pageChange__.bind(this));
        };

        /**
        * Makes a request for media
        * @private
        */
        MediaCtrl.prototype.__request__ = function () {
            var params = {
                $orderby: this.orderId,
                $skip: (this.page - 1) * this.pageSize,
                $top: this.pageSize,
                $filter: "StatusId eq " + this.statusId
            };

            if (this.search)
                params.search = this.search;

            console.log('requesting media with', params);

            this.__mediaWebserv__.get({ params: params }).then(this.__mediaSuccess__.bind(this)).catch(this.__mediaError__.bind(this));
        };

        /**
        * Indicates whether or not we're ready to request media
        * @returns {Boolean}
        * @private
        */
        MediaCtrl.prototype.__readyToRequest__ = function () {
            return this.statusId !== null && this.orderId !== null && this.pageSize !== null && this.search !== null && this.page != null;
        };

        /**
        * It's triggered when we get statuses from the server
        * @event
        * @param {Event} e
        * @param {Object[]} statuses
        * @private
        */
        MediaCtrl.prototype.__statusesReady__ = function (e, statuses) {
            this.statuses = statuses;
        };

        /**
        * It's triggered when the status changes
        * @event
        * @param {Event} e
        * @param {Number} statusId
        * @private
        */
        MediaCtrl.prototype.__statusChange__ = function (e, statusId) {
            console.log('MediaCtrl has heard of a change of status', statusId);
            this.statusId = statusId;
            if (this.__readyToRequest__())
                this.__request__();
        };

        /**
        * It's triggered when the order changes
        * @event
        * @param {Event} e
        * @param {Number} orderId
        * @private
        */
        MediaCtrl.prototype.__orderChange__ = function (e, orderId) {
            console.log('MediaCtrl has heard of a chage of order', orderId);
            this.orderId = orderId;
            if (this.__readyToRequest__())
                this.__request__();
        };

        /**
        * It's triggered when the page size changes
        * @event
        * @param {Event} e
        * @param {Number} pageSize
        * @private
        */
        MediaCtrl.prototype.__pageSizeChange__ = function (e, pageSize) {
            console.log('MediaCtrl has heard of a change of page size', pageSize);
            this.pageSize = pageSize;
            if (this.__readyToRequest__())
                this.__request__();
        };

        /**
        * It's triggered when search query changes
        * @event
        * @param {Event} e
        * @param {String} search
        * @private
        */
        MediaCtrl.prototype.__newSearch__ = function (e, search) {
            console.log('MediaCtrl has heard of a new search', search);
            this.search = search;
            if (this.__readyToRequest__())
                this.__request__();
        };

        /**
        * It's triggered when the page changes
        * @event
        * @param {Event} e
        * @param {Number} page
        * @private
        */
        MediaCtrl.prototype.__pageChange__ = function (e, page) {
            console.log('MediaCtrl has heard of a page change', page);
            this.page = page;
            if (this.__readyToRequest__())
                this.__request__();
        };

        /**
        * Gets triggered when we have a response from the server
        * @param {Object} resp
        * @event
        */
        MediaCtrl.prototype.__mediaSuccess__ = function (resp) {
            console.log('got response: ', resp);
            if (resp.status === 200 && resp.data) {
                this.list = resp.data.Results;
            }
        };

        /**
        * Gets triggered when something when wrong in the server
        * @event
        */
        MediaCtrl.prototype.__mediaError__ = function () {
            console.error('there was an error trying to get media');
        };

        /**
        * Happens when the user clicks on a media
        * @event
        * @param {Event} e
        * @param {Number} idx
        * @public
        */
        MediaCtrl.prototype.mediaClick = function (e, idx) {
            e.preventDefault();
            console.log('media clicked on: ', this.list[idx]);

            this.selected = idx;

            this.__$modal__.open({
                templateUrl: 'media-detail.html',
                controller: 'mediaDetailCtrl',
                scope: this.__scope__
            }).result.then(this.__onMediaDetailClose__.bind(this));
        };

        /**
        * This method is called when the user closes the overlay by changing the status of the media
        * @event
        * @param {Object} result
        * @private
        */
        MediaCtrl.prototype.__onMediaDetailClose__ = function (result) {
            // let's update status counts
            result.status.Count++;

            this.__request__();
        };

        /**
        * @type Object
        * @public
        */
        MediaCtrl.prototype.getSelected = function () {
            if (this.selected >= 0) {
                return this.list[this.selected];
            } else {
                return null;
            }
        };

        /**
        * @type String
        * @public
        */
        MediaCtrl.prototype.getIconByType = function (item) {
            return item === 'image' ? 'glyphicon-picture' : 'glyphicon-facetime-video';
        };
        MediaCtrl.$inject = [
            '$scope',
            '$rootScope',
            '$modal',
            'mediaWebserv'
        ];
        return MediaCtrl;
    })(BaseCtrl);

    
    return MediaCtrl;
});
