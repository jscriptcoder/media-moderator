/// <reference path="../typings/angular/angular.d.ts"/>

/**
 * Basic functionality when there is a scope around (Controllers and Directives)
 * @class Scope
 */
class Scope {

    /**
     * @type ng.IScope
     * @private
     */
    __scope__;

    /**
     * Creates a bridge between the scope and the instance
     * @param {ng.IScope}
     * @param {String} [name]
     * @private
     */
    __bridgeScope__(scope, name) {

        if (name) {
            angular.extend(this, scope[name]); // mixes in
            if (scope[name] !== this) scope[name] = this; // bridge
        }

        this.__scope__ = scope;
    }

    /**
     * Sets model properties running apply method of the scope
     * @param {String|Object<String,Any>} prop
     * @param {Any} val
     * @public
     */
    setModel(prop, val) {
        if (typeof prop === 'object') {
            this.__scope__.$apply(() => {
                for (var p in prop) {
                    if (prop.hasOwnProperty(p)) {
                        this[p] = prop[p];
                    }
                }
            });
        } else {
            this.__scope__.$apply(() => { this[prop] = val; });
        }
    }

}

export = Scope;