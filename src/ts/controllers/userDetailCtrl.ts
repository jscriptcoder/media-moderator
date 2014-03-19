import BaseCtrl = require('./baseCtrl');

/**
 * @cass UserDetailCtrl
 * @extends BaseCtrl
 */
class UserDetailCtrl extends BaseCtrl {

    /**
     * @param {ng.IScope} $scope
     * @constructor
     */
    constructor($scope) {
        super($scope, 'userDetail');
    }

}

export = UserDetailCtrl;