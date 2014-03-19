/**
 * Wraps ajax functionality, using $http service
 * @class WebService
 */
class WebService {

    /**
     * @type String[]
     */
    static $inject = ['$http'];

    /**
     * @type Object
     * @public
     */
    api: any = {};

    /**
     * @type ng.IHttpService
     * @private
     */
    __$html__;

    /**
     * @constructor
     * @param {ng.IHttpService} $html
     */
    constructor($html) {
        this.__$html__ = $html;
    }

    /**
     * Creates the wrapper function that will call url
     * @param {String} url
     * @returns {Function}
     * @private
     */
    __createMethods__(url) {
        return (method, data, config) => {

            if (typeof method !== 'string') {
                data = config = method;
                method = 'get';
            }

            console.log('calling', url, 'with', data);

            return this.__$html__[method](url, data, config);
        };
    }

    /**
     * Adds methods to the api
     * @param {String|Object} method
     * @param {String} [url]
     * @public
     */
    setApi(method, url) {

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
    }

}

export = WebService;