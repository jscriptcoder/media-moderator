var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", './webservice', '../config'], function(require, exports, WebService, Config) {
    /**
    * RESTful API for statuses
    * @class StatusWebserv
    * @extends WebService
    */
    var StatusWebserv = (function (_super) {
        __extends(StatusWebserv, _super);
        /**
        * @constructor
        * @param {ng.IHttpService} $html
        */
        function StatusWebserv($http) {
            _super.call(this, $http);
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
        StatusWebserv.prototype.get = function (data) {
            return this.api.status('get', data);
        };
        return StatusWebserv;
    })(WebService);

    
    return StatusWebserv;
});
