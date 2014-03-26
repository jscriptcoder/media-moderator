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
     * @type Number
     * @private
     */
    __order__ = [];

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
                    this.length = this.__order__.push(key);
                }

                this[key] = val;

                break;
        }
    }

    /**
     * Deletes properties
     * @param {String} key
     * @public
     */
    del(key) {
        if (key in this) {
            var pos = this.__order__.indexOf(key);
            this.__order__.splice(pos, 1);
            //this.length = this.__order__.length;
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
        this.__order__.forEach((key, idx) => {
            fn(this[key], idx);
        });
    }

    /**
     * Empties the object of properties
     * @public
     */
    empty() {
        this.__order__.forEach((key) => delete this[key]);
        this.__order__ = [];
        this.length = 0;
    }

}

export = BetterObject;