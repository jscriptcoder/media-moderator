var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", './baseDir', '../config'], function(require, exports, BaseDir, Config) {
    /// <reference path="../typings/angular/angular.d.ts"/>
    /**
    * mt-media-controls directive. Media controls, ordering, filtering and search
    * @class MTMediaControls
    * @extends BaseDir
    * @requires ng/$rootScope
    */
    var MTMediaControls = (function (_super) {
        __extends(MTMediaControls, _super);
        /**
        * @constructor
        * @param {ng.IScope} mediaParameters
        */
        function MTMediaControls($rootScope) {
            var _this = this;
            _super.call(this);
            /**
            * This directive is restricted to elements
            * @type String
            * @public
            */
            this.restrict = 'E';
            /**
            * Template url
            * @type String
            * @public
            */
            this.templateUrl = 'mt-media-controls.html';
            /**
            * @type Boolean
            * @public
            */
            this.scope = true;
            /**
            * Indicates the order of media (most recent, oldest, etc...)
            * @type Number
            * @public
            */
            this.orderBy = Config.orderBy;
            /**
            * Indicates the number of items per page
            * @type Number
            * @public
            */
            this.pageSize = Config.pageSize;
            /**
            * Contains info about multiselection, such as total items selected
            * and buttons for approval, rejection and/or pending
            * @type Object
            * @public
            */
            this.multiselection = { totalItems: 0 };
            /**
            * Search query (by username or ane)
            * @type String
            * @public
            */
            this.search = '';
            /**
            * Linking function
            * @param {ng.IScope} scope
            * @param {JQuery} iElement
            * @param {ng.IAttributes} iAttrs
            * @public
            */
            this.link = function (scope, iElement, iAttrs) {
                _this.__bridgeScope__(scope, 'controls');
                _this.__listen__();
            };
            this.__$rootScope__ = $rootScope;
        }
        /**
        * Subscribe listeners to events
        * @private
        */
        MTMediaControls.prototype.__listen__ = function () {
            this.__scope__.$on('multiselectedMediaClick', this.__multiselectedMediaClick__.bind(this));
            this.__scope__.$on('statusChange', this.__statusChange__.bind(this));
        };

        /**
        * It's triggered when the user clicks on media multiselection checkboxes
        * @event
        * @param {Event} e
        * @param {Object} media
        * @param {BetterObject} multiselected
        * @param {Object} extraInfo
        * @param {Object} statuses
        * @private
        */
        MTMediaControls.prototype.__multiselectedMediaClick__ = function (e, media, multiselected, extraInfo, statuses) {
            console.log('MTMediaControls has heard of a click on multiselection', media);

            // adds the statuses info only the first time
            if (angular.isUndefined(this.multiselection.status1)) {
                angular.extend(this.multiselection, {
                    status1: statuses[extraInfo.status1Id],
                    status2: statuses[extraInfo.status2Id]
                });
            }

            // then update the total of items
            this.multiselection.totalItems = multiselected.length;
        };

        /**
        * It's triggered when the status changes
        * @event
        * @param {Event} e
        * @param {Object} status
        * @private
        */
        MTMediaControls.prototype.__statusChange__ = function (e, status) {
            console.log('MTMediaControls has heard of a change of status to', status);
            delete this.multiselection.status1;
            delete this.multiselection.status2;
            this.multiselection.totalItems = 0;
        };

        /**
        * Gets triggered when the user changes the order
        * @event
        */
        MTMediaControls.prototype.orderChange = function () {
            console.log('order has changed to', this.orderBy);
            this.__$rootScope__.$broadcast('orderChange', this.orderBy);
        };

        /**
        * Gets triggered when the user changes size of the page
        * @event
        */
        MTMediaControls.prototype.pageSizeChange = function () {
            console.log('page size has changed to', this.pageSize);
            this.__$rootScope__.$broadcast('pageSizeChange', this.pageSize);
        };

        /**
        * Triggers when the user clicks on search button
        * @param $event
        */
        MTMediaControls.prototype.searchClick = function ($event) {
            console.log('new search:', this.search);
            this.__$rootScope__.$broadcast('newSearch', this.search);
        };
        MTMediaControls.factory = [
            '$rootScope',
            function ($rootScope) {
                return new MTMediaControls($rootScope);
            }
        ];
        return MTMediaControls;
    })(BaseDir);

    
    return MTMediaControls;
});
