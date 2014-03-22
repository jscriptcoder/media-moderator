import BaseDir = require('./baseDir');

/**
 * @class MTStatusList
 * @extends BaseDir
 * @requires ng/$rootScope
 * @requires services/Utils
 * @requires services/StatusWebserv
 */
class MTStatusList extends BaseDir {

    /**
     * Factory function that registers the directive
     * @returns {MTStatusList}
     * @static
     */
    static factory = [

        '$rootScope',
        'statusWebserv',
        'utils',

        ($rootScope, statusWebserv, utils) => {
            return new MTStatusList($rootScope, statusWebserv, utils);
        }
    ];

    /**
     * Scope attribute - list of statuses
     * @type Object[]
     * @public
     */
    list = [];

    /**
     * Keeps track of the status selected
     * @type Number
     * @public
     */
    selected;

    /**
     * Will replace the directive with the template
     * This directive is restricted to elements
     * @type String
     * @public
     */
    restrict = 'E';

    /**
     * Template url
     * @type String
     * @public
     */
    templateUrl = 'mt-status-list.html';

    /**
     * Creates a new scope for this directive
     * @type Boolean
     * @public
     */
    scope = true;

    /**
     * @type ng.IScope
     * @private
     */
    __$rootScope__;

    /**
     * @type services/StatusWebserv
     * @private
     */
    __statusWebserv__;

    /**
     * @type services/Utils
     * @private
     */
    __utils__;

    /**
     * @constructor
     * @param {ng,IScope} $rootScope
     * @param {StatusWebserv} statusWebserv
     * @param {Utils} utils
     */
    constructor($rootScope, statusWebserv, utils) {
        super();

        this.__$rootScope__ = $rootScope;
        this.__statusWebserv__ = statusWebserv;
        this.__utils__ = utils;
    }

    /**
     * Linking function
     * @param {ng.IScope} scope
     * @param {JQuery} iElement
     * @param {ng.IAttributes} iAttrs
     * @public
     */
    link = (scope, iElement, iAttrs) => {
        this.__bridgeScope__(scope, 'status');

        var promise = this.__statusWebserv__.get();

        promise
            .then(this.__statusSuccess__.bind(this))
            .catch(this.__statusError__.bind(this))
        ;
    };

    /**
     * Gets triggered when we have a response from the server
     * @param {Object} resp
     * @event
     */
    __statusSuccess__(resp) {
        console.log('got response: ', resp);
        if (resp.status === 200 && this.__utils__.isArray(resp.data)) {
            this.list = resp.data;

            this.__$rootScope__.$broadcast('statusesReady', resp.data);

            // selects first one by default
            this.__selectStatus__(0);
        }
    }

    /**
     * Gets triggered when something when wrong in the server
     * @event
     */
    __statusError__() {
        console.error('there was an error trying to get statuses');
    }

    /**
     * Selects the status, publishing the selected one
     * @param {Number} idx
     * @private
     */
    __selectStatus__(idx) {
        if (this.list[idx]) {
            console.log('Changing status to', this.list[idx]);
            this.selected = idx;

            var status = this.list[idx];
            this.__$rootScope__.$broadcast('statusChange', status.Status.Id, status.Count);
        }
    }

    /**
     * Gets triggered when the user clicks on the status
     * @param {Event} $event
     * @param {Number} idx
     * @event
     */
    statusClick($event, idx) {
        $event.preventDefault();
        this.__selectStatus__(idx);
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
}

export = MTStatusList;