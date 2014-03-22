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

            var promise = this.__mediaWebserv__.get({ params: params });

            promise.then(this.__mediaSuccess__.bind(this)).catch(this.__mediaError__.bind(this));
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
            console.log('MediaCtrl has heard of a change of status to', statusId);

            this.statusId = statusId;
            this.page = 1;

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
            console.log('MediaCtrl has heard of a chage of order to', orderId);
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
            console.log('MediaCtrl has heard of a change of page size to', pageSize);
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
            console.log('MediaCtrl has heard of a new search:', search);
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
            console.log('MediaCtrl has heard of a page change to', page);
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
            console.log('media clicked on:', this.list[idx]);

            this.selected = idx;

            var $modalInstance = this.__$modal__.open({
                templateUrl: 'media-detail.html',
                controller: 'mediaDetailCtrl',
                scope: this.__scope__
            });

            $modalInstance.result.then(this.__onMediaDetailClose__.bind(this));
        };

        /**
        * This method is called when the user closes the overlay by changing the status of the media
        * @event
        * @param {Object} result
        * @private
        */
        MediaCtrl.prototype.__onMediaDetailClose__ = function (result) {
            var media = result.media, newStatus = result.status, curStatus = this.statuses.filter(function (val) {
                return (val.Status.Id === media.StatusId);
            })[0];

            // let's update status counts
            newStatus.Count++;
            curStatus.Count--;

            this.__$rootScope__.$broadcast('totalMediaChange', curStatus.Count);

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
            return item === 'image' ? Config.clsIcoPicture : Config.clsIcoVideo;
        };

        /**
        * Builds the url that link to the user based on the username
        * @type String
        * @public
        */
        MediaCtrl.prototype.getUserUrl = function (username) {
            return Config.urlProvider + username;
        };

        /**
        * Returns some extra information about the media items
        * @param {Object} item
        * @returns Object
        * @public
        */
        MediaCtrl.prototype.getItemExtraInfo = function (item) {
            var status = item.StatusId, $extra = {};

            switch (status) {
                case 1:
                    $extra.clsStatus1 = Config.clsIcoStatuses[$extra.status1Id = 2];
                    $extra.clsStatus2 = Config.clsIcoStatuses[$extra.status2Id = 3];
                    break;
                case 2:
                    $extra.clsStatus1 = Config.clsIcoStatuses[$extra.status1Id = 1];
                    $extra.clsStatus2 = Config.clsIcoStatuses[$extra.status2Id = 3];
                    break;
                case 3:
                    $extra.clsStatus1 = Config.clsIcoStatuses[$extra.status1Id = 2];
                    $extra.clsStatus2 = Config.clsIcoStatuses[$extra.status2Id = 1];
                    break;
            }

            return $extra;
        };

        /**
        * Happens when the user clicks on a status change
        * @event
        * @param {Number} mediaId
        * @param {Number} statusId
        * @public
        */
        MediaCtrl.prototype.statusClick = function (mediaId, statusId) {
            var _this = this;
            var promise = this.__mediaWebserv__.setStatus({
                id: mediaId,
                statusId: statusId
            });

            promise.then(function (resp) {
                _this.__statusSuccess__(resp, status);
            }).catch(this.__statusError__.bind(this));
        };

        /**
        * Gets triggered when we have a response from the server
        * @param {Object} resp
        * @param {Object} status
        * @event
        */
        MediaCtrl.prototype.__statusSuccess__ = function (resp, status) {
            console.log('got response: ', resp);
            if (resp.status === 200) {
                // TODO
            }
        };

        /**
        * Gets triggered when something when wrong in the server
        * @event
        */
        MediaCtrl.prototype.__statusError__ = function () {
            console.error('there was an error trying to set the status');
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
