import BaseDir = require('./baseDir');
import Config = require('../config');

/// <reference path="../typings/angular/angular.d.ts"/>

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
     * Contains info about multiselection, such as total items selected 
     * and buttons for approval, rejection and/or pending
     * @type Object
     * @public
     */
    multiselection: any = { totalItems: 0 };

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
     * Subscribe listeners to events
     * @private
     */
    __listen__() {
        this.__scope__.$on('multiselectedMediaClick', this.__multiselectedMediaClick__.bind(this));
        this.__scope__.$on('statusChange', this.__statusChange__.bind(this));
    }

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
    __multiselectedMediaClick__(e, media, multiselected, extraInfo, statuses) {
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

    }

    /**
     * It's triggered when the status changes
     * @event
     * @param {Event} e
     * @param {Object} status
     * @private
     */
    __statusChange__(e, status) {
        console.log('MTMediaControls has heard of a change of status to', status);
        delete this.multiselection.status1;
        delete this.multiselection.status2;
        this.multiselection.totalItems = 0;
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
        this.__listen__();
    };

}

export = MTMediaControls;