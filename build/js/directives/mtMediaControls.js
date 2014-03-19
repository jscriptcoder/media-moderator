var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", './baseDir', '../config'], function(require, exports, BaseDir, Config) {
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
            };
            this.__$rootScope__ = $rootScope;
        }
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
