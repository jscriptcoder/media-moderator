import Scope = require('../utils/scope');

/**
 * @class BaseCtrl
 * @extends Scope
 */
class BaseCtrl extends Scope {

    /**
     * @type String[]
     * @static
     */
    static $inject = ['$scope'];

    /**
     * @constructor
     * @param {ng.IScope} $scope
     * @param {String} [model]
     */
        constructor($scope, model?) {
        super();
        this.__bridgeScope__($scope, model);
    }

}

export = BaseCtrl;