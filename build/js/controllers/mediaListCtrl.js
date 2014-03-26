var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", './baseCtrl', '../config', '../utils/betterObject'], function(require, exports, BaseCtrl, Config, BetterObject) {
    /**
    * @cass MediaCtrl
    * @extends BaseCtrl
    * @requires ng/$rootScope
    * @requires bootstrap-ui/$modal
    * @requires services/MediaWebserv
    * @requires utils/BetterObject
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
            * @type BetterObject
            * @public
            */
            this.multiselected = new BetterObject;
            /**
            * list of statuses
            * @type BetterObject
            * @public
            */
            this.statuses = new BetterObject;
            /**
            * Contains some extra info we'll need for the UI, based on the status
            * @type Object
            * @public
            */
            this.extra = {};
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
            this.__scope__.$on('unselectAllMedia', this.__unselectAllMedia__.bind(this));
            this.__scope__.$on('statusMultiMedia', this.__statusMultiMedia__.bind(this));
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
            var _this = this;
            statuses.forEach(function (status) {
                return _this.statuses.set(status.Status.Id, status);
            });
        };

        /**
        * It's triggered when the status changes
        * @event
        * @param {Event} e
        * @param {Object} status
        * @private
        */
        MediaCtrl.prototype.__statusChange__ = function (e, status) {
            console.log('MediaCtrl has heard of a change of status to', status);

            this.statusId = status.Status.Id;
            this.extra = status.extra;
            this.page = 1;
            this.multiselected.empty();

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

            $modalInstance.result.then(this.__mediaDetailClose__.bind(this));
        };

        /**
        * Will change the status of this media
        * @param {Object} media
        * @param {Number} statusId
        * @private
        */
        MediaCtrl.prototype.__changeStatus__ = function (media, statusId) {
            var _this = this;
            var newStatus = this.statuses[statusId], oldStatus = this.statuses[media.StatusId];

            console.log('new status:', newStatus, ', old status:', oldStatus);

            var promise = this.__mediaWebserv__.setStatus({
                Id: media.Id,
                StatusId: statusId
            });

            promise.then(function (resp) {
                return _this.__statusSuccess__(resp, newStatus, oldStatus);
            }).catch(this.__statusError__.bind(this));
        };

        /**
        * This method is called when the user closes the overlay by changing the status of the media
        * @event
        * @param {Object} result
        * @private
        */
        MediaCtrl.prototype.__mediaDetailClose__ = function (result) {
            this.__changeStatus__(result.media, result.statusId);
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
        * Happens when the user clicks on a status change
        * @event
        * @param {Object} media
        * @param {Number} statusId
        * @public
        */
        MediaCtrl.prototype.statusClick = function (media, statusId) {
            this.__changeStatus__(media, statusId);
        };

        /**
        * Gets triggered when we have a response from the server
        * @param {Object} resp
        * @param {Object} newStatus
        * @param {Object} oldStatus
        * @param {Number} [howMany=1]
        * @event
        */
        MediaCtrl.prototype.__statusSuccess__ = function (resp, newStatus, oldStatus, howMany) {
            if (typeof howMany === "undefined") { howMany = 1; }
            console.log('got response: ', resp);
            if (resp.status === 200) {
                // let's update status counts
                newStatus.Count += howMany;
                oldStatus.Count -= howMany;

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
                    this.list.splice(0, howMany);
                }
            }
        };

        /**
        * Gets triggered when something when wrong in the server
        * @event
        */
        MediaCtrl.prototype.__statusError__ = function () {
            console.error('there was an error trying to set the status');
        };

        /**
        * Happens when the user clicks on multiselection checkbox.
        * It'll add or remove an item from the multiselected list
        * @event
        * @param {Object} media
        * @public
        */
        MediaCtrl.prototype.multiselectClick = function (media) {
            media.checked = !media.checked;
            if (media.checked) {
                this.multiselected.set(media.Id, media);
            } else {
                this.multiselected.del(media.Id);
            }

            console.log('media multiselection', this.multiselected.__keys__);

            this.__$rootScope__.$broadcast('multiselectedMediaClick', media, this.multiselected, this.extra, this.statuses);
        };

        /**
        * Unselects all the media items, resetting "multiselected" object
        * @private
        */
        MediaCtrl.prototype.__unselectAllMedia__ = function () {
            this.multiselected.forEach(function (item) {
                return item.checked = false;
            });
            this.multiselected.empty();
        };

        /**
        * Changes the status of all the selected media
        * @param {Event} e
        * @param {String} statusId
        * @private
        */
        MediaCtrl.prototype.__statusMultiMedia__ = function (e, statusId) {
            var _this = this;
            var newStatus = this.statuses[statusId], oldStatus = this.statuses[this.multiselected.getByIdx(0).StatusId], ids = this.multiselected.keys();

            console.log('setting status of media items', ids, 'to', statusId);

            var promise = this.__mediaWebserv__.setStatusMulti({
                Ids: ids,
                StatusId: statusId
            });

            promise.then(function (resp) {
                return _this.__statusSuccess__(resp, newStatus, oldStatus, ids.length);
            }).then(function () {
                return _this.__$rootScope__.$broadcast('statusMultiMediaChange');
            }).catch(this.__statusError__.bind(this));
        };

        /**
        * Processes the string of comma-separated tags comming from the server
        * @param {String} tags
        * @public
        */
        MediaCtrl.prototype.sanitizeTags = function (tags) {
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
