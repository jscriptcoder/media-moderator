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

        this.setApi({
            media: Config.mediaApi,
            status: Config.statusChangeApi,
            statusMulti: Config.statusChangeMultiApi
        });

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
     * @param {String} data.Id
     * @param {String} data.StatusId
     * @returns {ng.IPromise}
     * @public
     */
    setStatus(data) {
        return this.api.status('put', data, {
            headers: { 'Content-Type': 'application/json; charset=UTF-8' }
        });
    }

    /**
     * PUT method to set the status of a multiple media
     * @param {Object} data
     * @param {String[]} data.Ids
     * @param {String} data.StatusId
     * @returns {ng.IPromise}
     * @public
     */
    setStatusMulti(data) {
        return this.api.statusMulti('put', data, {
            headers: { 'Content-Type': 'application/json; charset=UTF-8' }
        });
    }

}

export = MediaWebserv;