var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", './webservice', '../config'], function(require, exports, WebService, Config) {
    /**
    * RESTful API for media
    * @class MediaWebserv
    * @extends WebService
    */
    var MediaWebserv = (function (_super) {
        __extends(MediaWebserv, _super);
        /**
        * @constructor
        * @param {ng.IHttpService} $html
        */
        function MediaWebserv($http) {
            _super.call(this, $http);

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
        MediaWebserv.prototype.get = function (data) {
            return this.api.media('get', data);
        };

        /**
        * PUT method to set the status of a media
        * @param {Object} data
        * @param {String} data.Id
        * @param {String} data.StatusId
        * @returns {ng.IPromise}
        * @public
        */
        MediaWebserv.prototype.setStatus = function (data) {
            return this.api.status('put', data, {
                headers: { 'Content-Type': 'application/json; charset=UTF-8' }
            });
        };

        /**
        * PUT method to set the status of a multiple media
        * @param {Object} data
        * @param {String[]} data.Ids
        * @param {String} data.StatusId
        * @returns {ng.IPromise}
        * @public
        */
        MediaWebserv.prototype.setStatusMulti = function (data) {
            return this.api.statusMulti('put', data, {
                headers: { 'Content-Type': 'application/json; charset=UTF-8' }
            });
        };
        return MediaWebserv;
    })(WebService);

    
    return MediaWebserv;
});
