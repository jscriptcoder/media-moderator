import BaseCtrl = require('./baseCtrl');

/**
 * @cass MainCtrl
 * @extends BaseCtrl
 */
class MainCtrl extends BaseCtrl {

    /**
     * @param {ng.IScope} $scope
     * @constructor
     */
    constructor($scope) {
        super($scope, 'main');
    }

}

export = MainCtrl; 