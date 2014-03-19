define(["require", "exports"], function(require, exports) {
    /**
    * Wraps ajax functionality, using $http service
    * @class WebService
    */
    var WebService = (function () {
        /**
        * @constructor
        * @param {ng.IHttpService} $html
        */
        function WebService($html) {
            /**
            * @type Object
            * @public
            */
            this.api = {};
            this.__$html__ = $html;
        }
        /**
        * Creates the wrapper function that will call url
        * @param {String} url
        * @returns {Function}
        * @private
        */
        WebService.prototype.__createMethods__ = function (url) {
            var _this = this;
            return function (method, data, config) {
                if (typeof method !== 'string') {
                    data = config = method;
                    method = 'get';
                }

                console.log('calling', url, 'with', data);

                return _this.__$html__[method](url, data, config);
            };
        };

        /**
        * Adds methods to the api
        * @param {String|Object} method
        * @param {String} [url]
        * @public
        */
        WebService.prototype.setApi = function (method, url) {
            if (typeof method === 'object') {
                for (var m in method) {
                    if (method.hasOwnProperty((m))) {
                        this.setApi(m, method[m]);
                    }
                }
            } else if (typeof method === 'string') {
                console.log('creating method:', method, '->', url);

                this.api[method] = this.__createMethods__(url);
            }
        };
        WebService.$inject = ['$http'];
        return WebService;
    })();

    
    return WebService;
});
