define(["require", "exports"], function(require, exports) {
    /**
    * Holds a bunch of utilities
    * @namespace Utils
    */
    var Utils;
    (function (Utils) {
        /**
        * @type Function
        * @private
        */
        var toString = Object.prototype.toString;

        /**
        * Whether or not the value is an array
        * @param {Any} value
        * @returns {Boolean}
        * @memberof Utils
        */
        function isArray(value) {
            return toString.call(value) === '[object Array]';
        }
        Utils.isArray = isArray;

        /**
        * Whether or not the value is defined
        * @param {Any} value
        * @returns {Boolean}
        * @memberof Utils
        */
        function isDefined(value) {
            return typeof value !== 'undefined';
        }
        Utils.isDefined = isDefined;

        /**
        * Whether or not the value is a string
        * @param {Any} value
        * @returns {Boolean}
        * @memberof Utils
        */
        function isString(value) {
            return typeof value === 'string';
        }
        Utils.isString = isString;

        /**
        * Strips all the html from the input
        * @param {String} html
        * @returns {String}
        * @memberof Utils
        */
        function stripHtml(html) {
            if (typeof html === "undefined") { html = ''; }
            return html.replace(/(<[^>]+>)/ig, '');
        }
        Utils.stripHtml = stripHtml;

        /**
        * Returns the url query string parameter
        * @param {String} key
        * @param {String} [qs = window.location.href]
        * @returns {String}
        * @memberof Utils
        */
        function getUrlParam(key, qs) {
            if (typeof qs === "undefined") { qs = window.location.href; }
            var results = new RegExp('[\\?&]' + key + '=([^&#]*)').exec(qs);
            return (results && results[1]) ? decodeURIComponent(results[1]) : '';
        }
        Utils.getUrlParam = getUrlParam;

        /**
        * Returns the url hashtag parameter
        * @param {String} [qs = window.location.href]
        * @returns {String}
        * @memberof Utils
        */
        function getUrlHashtag(qs) {
            if (typeof qs === "undefined") { qs = window.location.href; }
            var results = new RegExp('#([^#]*)').exec(qs);
            return (results && results[1]) ? decodeURIComponent(results[1]) : '';
        }
        Utils.getUrlHashtag = getUrlHashtag;

        /**
        * Creates namespaces
        * @param {Object} [root]
        * @param {String} path
        * @param {Any} [value]
        * @returns {Object}
        * @memberof Utils
        */
        function namespace(root, path, value) {
            if (isString(root) || isArray(root)) {
                value = path;
                path = root;
                root = window;
            }

            if (isArray(path)) {
                path.forEach(function (val) {
                    namespace(root, val);
                });
            } else if (isString(path)) {
                var nspace = path.split('.'), len = nspace.length;

                nspace.forEach(function (ns, idx) {
                    root = root[ns] = (idx + 1 === len && isDefined(value)) ? value : (root[ns] || {});
                });

                return root;
            }
        }
        Utils.namespace = namespace;
    })(Utils || (Utils = {}));

    
    return Utils;
});
