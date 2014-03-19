import BaseCtrl = require('./baseCtrl');

/**
 * @cass UsersCtrl
 * @extends BaseCtrl
 */
class UsersCtrl extends BaseCtrl {

    /**
     * @param {ng.IScope} $scope
     * @constructor
     */
    constructor($scope) {
        super($scope, 'users');
    }

}

export = UsersCtrl;