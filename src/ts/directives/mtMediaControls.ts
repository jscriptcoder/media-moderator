import BaseDir = require('./baseDir');
import Config = require('../config');

/**
 * mt-media-controls directive. Media controls, ordering, filtering and search
 * @class MTMediaControls
 * @extends BaseDir
 * @requires ng/$rootScope
 */
class MTMediaControls extends BaseDir {

    /**
     * Factory function that registers the directive
     * @returns {MTMediaControls}
     * @static
     */
    static factory = [
        '$rootScope',
        ($rootScope) => { return new MTMediaControls($rootScope) }
    ]

    /**
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
    templateUrl = 'mt-media-controls.html';

    /**
     * @type Boolean
     * @public
     */
    scope = true;

    /**
     * Indicates the order of media (most recent, oldest, etc...)
     * @type Number
     * @public
     */
    orderBy = Config.orderBy;

    /**
     * Indicates the number of items per page
     * @type Number
     * @public
     */
    pageSize = Config.pageSize;

    /**
     * Search query (by username or ane)
     * @type String
     * @public
     */
    search = '';

    /**
     * @type ng.IScope
     * @private
     */
    __scope__;

    /**
     * @type ng.IScope
     * @private
     */
    __$rootScope__;

    /**
     * @constructor
     * @param {ng.IScope} mediaParameters
     */
    constructor($rootScope) {
        super();
        this.__$rootScope__ = $rootScope;
    }

    /**
     * Gets triggered when the user changes the order
     * @event
     */
    orderChange() {
        console.log('order has changed to', this.orderBy);
        this.__$rootScope__.$broadcast('orderChange', this.orderBy);
    }

    /**
     * Gets triggered when the user changes size of the page
     * @event
     */
    pageSizeChange() {
        console.log('page size has changed to', this.pageSize);
        this.__$rootScope__.$broadcast('pageSizeChange', this.pageSize);
    }

    /**
     * Triggers when the user clicks on search button
     * @param $event
     */
    searchClick($event) {
        console.log('new search:', this.search);
        this.__$rootScope__.$broadcast('newSearch', this.search);
    }

    /**
     * Linking function
     * @param {ng.IScope} scope
     * @param {JQuery} iElement
     * @param {ng.IAttributes} iAttrs
     * @public
     */
    link = (scope, iElement, iAttrs) => {
        this.__bridgeScope__(scope, 'controls');
    };

}

export = MTMediaControls;