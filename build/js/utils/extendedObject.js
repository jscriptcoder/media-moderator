define(["require", "exports"], function(require, exports) {
    /**
    * This is an "improved" version of js objects, or at least better for the purposes ;-)
    * @class ExtendedObject
    */
    var ExtendedObject = (function () {
        /**
        * @constructor
        * @param {Object} [obj]
        */
        function ExtendedObject(obj) {
            /**
            * Will keep track of the number of properties attached
            * @type Number
            * @public
            */
            this.length = 0;
            /**
            * Will keep track of the order in which the props were added to the object
            * by storing the keys in this array
            * @type String[]
            * @private
            */
            this.__keys__ = [];
            if (typeof obj === 'object')
                this.set(obj);
        }
        /**
        * Attaches properties to the object
        * @param {String|Object} key
        * @param {Any} [val]
        * @public
        */
        ExtendedObject.prototype.set = function (key, val) {
            switch (typeof key) {
                case 'object':
                    for (var p in key) {
                        if (key.hasOwnProperty(p)) {
                            this.set(p, key[p]);
                        }
                    }

                    break;

                case 'number':
                case 'string':
                    if (!(key in this)) {
                        this.length = this.__keys__.push(key);
                    }

                    this[key] = val;

                    break;
            }
        };

        /**
        * Retrieves a property by index
        * @param {Number} idx
        * @returns {Any}
        * @public
        */
        ExtendedObject.prototype.getByIdx = function (idx) {
            return this[this.__keys__[idx]];
        };

        /**
        * Gets back the list of keys
        * @returns {String[]}
        * @public
        */
        ExtendedObject.prototype.keys = function () {
            return this.__keys__;
        };

        /**
        * Deletes properties
        * @param {String} key
        * @public
        */
        ExtendedObject.prototype.del = function (key) {
            if (key in this) {
                var pos = this.__keys__.indexOf(key);
                this.__keys__.splice(pos, 1);

                //this.length = this.__keys__.length;
                this.length--;
                delete this[key];
            }
        };

        /**
        * Iterates through the properties attached to the object
        * @param {Function} fn
        * @public
        */
        ExtendedObject.prototype.forEach = function (fn) {
            var _this = this;
            this.__keys__.forEach(function (key, idx) {
                fn(_this[key], idx);
            });
        };

        /**
        * Empties the object of properties
        * @public
        */
        ExtendedObject.prototype.empty = function () {
            var _this = this;
            this.__keys__.forEach(function (key) {
                return delete _this[key];
            });
            this.__keys__ = [];
            this.length = 0;
        };
        return ExtendedObject;
    })();

    
    return ExtendedObject;
});
