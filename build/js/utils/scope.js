define(["require", "exports"], function(require, exports) {
    /**
    * Basic functionality when there is a scope around (Controllers and Directives)
    * @class Scope
    */
    var Scope = (function () {
        function Scope() {
        }
        /**
        * Creates a bridge between the scope and the instance
        * @param {ng.IScope}
        * @param {String} [name]
        * @private
        */
        Scope.prototype.__bridgeScope__ = function (scope, name) {
            if (name) {
                angular.extend(this, scope[name]); // mixes in
                if (scope[name] !== this)
                    scope[name] = this; // bridge
            }

            this.__scope__ = scope;
        };

        /**
        * Sets model properties running apply method of the scope
        * @param {String|Object<String,Any>} prop
        * @param {Any} val
        * @public
        */
        Scope.prototype.setModel = function (prop, val) {
            var _this = this;
            if (typeof prop === 'object') {
                this.__scope__.$apply(function () {
                    for (var p in prop) {
                        if (prop.hasOwnProperty(p)) {
                            _this[p] = prop[p];
                        }
                    }
                });
            } else {
                this.__scope__.$apply(function () {
                    _this[prop] = val;
                });
            }
        };
        return Scope;
    })();

    
    return Scope;
});
