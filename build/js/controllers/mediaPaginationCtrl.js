var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", './baseCtrl', '../config'], function(require, exports, BaseCtrl, Config) {
    /**
    * @cass MediaPaginationCtrl
    * @extends BaseCtrl
    */
    var MediaPaginationCtrl = (function (_super) {
        __extends(MediaPaginationCtrl, _super);
        /**
        * @constructor
        * @param {ng.IScope} $scope
        * @param {ng.IScope} $rootScope
        */
        function MediaPaginationCtrl($scope, $rootScope) {
            _super.call(this, $scope, 'paginator');
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
            /**
            * @type Number
            * @public
            */
            this.groupSize = Config.pageGroupSize;

            this.__$rootScope__ = $rootScope;

            this.__listen__();
        }
        /**
        * Subscribe listeners to events
        * @private
        */
        MediaPaginationCtrl.prototype.__listen__ = function () {
            this.__scope__.$on('statusChange', this.__statusChange__.bind(this));
            this.__scope__.$on('pageSizeChange', this.__pageSizeChange__.bind(this));
            this.__scope__.$on('totalMediaChange', this.__totalMediaChange__.bind(this));
            this.__scope__.$on('pageExternalChange', this.__pageExternalChange__.bind(this));
        };

        /**
        * It's triggered when the status changes
        * @event
        * @param {Event} e
        * @param {Object} status
        * @private
        */
        MediaPaginationCtrl.prototype.__statusChange__ = function (e, status) {
            console.log('MediaPaginationCtrl has heard of change of total media to', status.Count);
            this.totalMedia = status.Count;
            this.page = 1;
        };

        /**
        * It's triggered when the page size changes
        * @event
        * @param {Event} e
        * @param {Number} pageSize
        * @private
        */
        MediaPaginationCtrl.prototype.__pageSizeChange__ = function (e, pageSize) {
            console.log('MediaPaginationCtrl has heard of a change of page size to', pageSize);
            this.pageSize = pageSize;
        };

        /**
        * It's triggered when the total of media changes
        * @event
        * @param {Event} e
        * @param {Number} numMedia
        * @private
        */
        MediaPaginationCtrl.prototype.__totalMediaChange__ = function (e, numMedia) {
            console.log('MediaPaginationCtrl has heard of a change of total media to', numMedia);
            this.totalMedia = numMedia;
        };

        /**
        * Watches external page changes
        * @event
        * @param {Event} e
        * @param {Number} page
        * @private
        */
        MediaPaginationCtrl.prototype.__pageExternalChange__ = function (e, page) {
            console.log('MediaPaginationCtrl has heard of a external change of page to', page);
            this.page = page;
        };

        /**
        * Triggers when the user clicks on the paginator
        * @event
        * @param {Number} page
        */
        MediaPaginationCtrl.prototype.pageClick = function (page) {
            this.__$rootScope__.$broadcast('pageChange', page);
        };
        MediaPaginationCtrl.$inject = ['$scope', '$rootScope'];
        return MediaPaginationCtrl;
    })(BaseCtrl);

    
    return MediaPaginationCtrl;
});
