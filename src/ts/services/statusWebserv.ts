import WebService = require('./webservice');
import Config = require('../config');

/**
 * RESTful API for statuses
 * @class StatusWebserv
 * @extends WebService
 */
class StatusWebserv extends WebService {

    /**
     * @constructor
     * @param {ng.IHttpService} $html
     */
        constructor($http) {
        super($http);
        this.setApi('status', Config.statusApi);
    }

    /**
     * GET method to retrieve media depending on:
     * @param {Object} data
     * @param {Number} data.statusId
     * @param {String} data.orderBy
     * @param {String} data.searchFor
     * @returns {ng.IPromise}
     * @memberof MediaWebserv
     */
    get(data) {
        return this.api.status('get', data);
    }

}

export = StatusWebserv;