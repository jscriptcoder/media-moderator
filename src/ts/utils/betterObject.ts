/**
 * This is an "improved" version of js objects, or at least better for the purposes ;-)
 * @class BetterObject
 */
class BetterObject {

    /**
     * Will keep track of the number of properties attached
     * @type Number
     * @public
     */
    length = 0;

    /**
     * Will keep track of the order in which the props were added to the object
     * by storing the keys in this array
     * @type String[]
     * @private
     */
    __keys__ = [];

    /**
     * @constructor
     * @param {Object} [obj]
     */
    constructor(obj?) {
        if (typeof obj === 'object') this.set(obj);
    }

    /**
     * Attaches properties to the object
     * @param {String|Object} key
     * @param {Any} [val]
     * @public
     */
    set(key, val?) {
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
    }

    /**
     * Retrieves a property by index
     * @param {Number} idx
     * @returns {Any}
     * @public
     */
    getByIdx(idx) {
        return this[this.__keys__[idx]];
    }

    /**
     * Gets back the list of keys
     * @returns {String[]}
     * @public
     */
    keys() {
        return this.__keys__;
    }

    /**
     * Deletes properties
     * @param {String} key
     * @public
     */
    del(key) {
        if (key in this) {
            var pos = this.__keys__.indexOf(key);
            this.__keys__.splice(pos, 1);
            //this.length = this.__keys__.length;
            this.length--;
            delete this[key];
        }
    }

    /**
     * Iterates through the properties attached to the object
     * @param {Function} fn
     * @public
     */
    forEach(fn) {
        this.__keys__.forEach((key, idx) => {
            fn(this[key], idx);
        });
    }

    /**
     * Empties the object of properties
     * @public
     */
    empty() {
        this.__keys__.forEach((key) => delete this[key]);
        this.__keys__ = [];
        this.length = 0;
    }

}

export = BetterObject;