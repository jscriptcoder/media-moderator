var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", './baseDir'], function(require, exports, BaseDir) {
    /**
    * @class MTStatusList
    * @extends BaseDir
    * @requires ng/$rootScope
    * @requires services/Utils
    * @requires services/StatusWebserv
    */
    var MTStatusList = (function (_super) {
        __extends(MTStatusList, _super);
        /**
        * @constructor
        * @param {ng,IScope} $rootScope
        * @param {StatusWebserv} statusWebserv
        * @param {Utils} utils
        */
        function MTStatusList($rootScope, statusWebserv, utils) {
            var _this = this;
            _super.call(this);
            /**
            * Scope attribute - list of statuses
            * @type Object[]
            * @public
            */
            this.list = [];
            /**
            * Will replace the directive with the template
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
            this.templateUrl = 'mt-status-list.html';
            /**
            * Creates a new scope for this directive
            * @type Boolean
            * @public
            */
            this.scope = true;
            /**
            * Linking function
            * @param {ng.IScope} scope
            * @param {JQuery} iElement
            * @param {ng.IAttributes} iAttrs
            * @public
            */
            this.link = function (scope, iElement, iAttrs) {
                _this.__bridgeScope__(scope, 'status');

                var promise = _this.__statusWebserv__.get();

                promise.then(_this.__statusSuccess__.bind(_this)).catch(_this.__statusError__.bind(_this));
            };

            this.__$rootScope__ = $rootScope;
            this.__statusWebserv__ = statusWebserv;
            this.__utils__ = utils;
        }
        /**
        * Gets triggered when we have a response from the server
        * @param {Object} resp
        * @event
        */
        MTStatusList.prototype.__statusSuccess__ = function (resp) {
            console.log('got response: ', resp);
            if (resp.status === 200 && this.__utils__.isArray(resp.data)) {
                this.list = resp.data;

                this.__$rootScope__.$broadcast('statusesReady', resp.data);

                // selects first one by default
                this.__selectStatus__(0);
            }
        };

        /**
        * Gets triggered when something when wrong in the server
        * @event
        */
        MTStatusList.prototype.__statusError__ = function () {
            console.error('there was an error trying to get statuses');
        };

        /**
        * Selects the status, publishing the selected one
        * @param {Number} idx
        * @private
        */
        MTStatusList.prototype.__selectStatus__ = function (idx) {
            if (this.list[idx]) {
                console.log('Changing status to', this.list[idx]);
                this.selected = idx;

                var status = this.list[idx];
                this.__$rootScope__.$broadcast('statusChange', status.Status.Id, status.Count);
            }
        };

        /**
        * Gets triggered when the user clicks on the status
        * @param {Event} $event
        * @param {Number} idx
        * @event
        */
        MTStatusList.prototype.statusClick = function ($event, idx) {
            $event.preventDefault();
            this.__selectStatus__(idx);
        };

        /**
        * @type Object
        * @public
        */
        MTStatusList.prototype.getSelected = function () {
            if (this.selected >= 0) {
                return this.list[this.selected];
            } else {
                return null;
            }
        };
        MTStatusList.factory = [
            '$rootScope',
            'statusWebserv',
            'utils',
            function ($rootScope, statusWebserv, utils) {
                return new MTStatusList($rootScope, statusWebserv, utils);
            }
        ];
        return MTStatusList;
    })(BaseDir);

    
    return MTStatusList;
});
