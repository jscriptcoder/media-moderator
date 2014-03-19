import WebService = require('./webservice');
import Config = require('../config');

/**
 * RESTful API for media
 * @class MediaWebserv
 * @extends WebService
 */
class MediaWebserv extends WebService {

    /**
     * @constructor
     * @param {ng.IHttpService} $html
     */
    constructor($http) {
        super($http);
        this.setApi('media', Config.mediaApi);
    }

    /**
     * GET method to retrieve media depending on:
     * @param {Object} data
     * @param {String} data.statusId
     * @param {String} data.orderBy
     * @param {String} data.searchFor
     * @returns {ng.IPromise}
     * @public
     */
    get(data) {
        return this.api.media('get', data);
    }

    /**
     * PUT method to set the status of a media
     * @param {Object} data
     * @param {String} data.id
     * @param {String} data.statusId
     * @returns {ng.IPromise}
     * @public
     */
    setStatus(data) {
        return this.api.media('put', data, {
            headers: {
                'Content-Type': 'application/json; charset=UTF-8'
            }
        });
    }

}

export = MediaWebserv;