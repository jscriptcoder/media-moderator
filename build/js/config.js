/**
* We'll define all the configuration parameters in here
* @module config
*/
define(["require", "exports"], function(require, exports) {
    /**
    * Title of the application
    * @type String
    */
    exports.appTitle = 'Media Monitor';

    /**
    * Name of the application
    * @type String
    */
    exports.appName = 'mediaMonitor';

    /**
    * Status webservice URL
    * @type String
    */
    exports.statusApi = '/api/status';

    /**
    * Media webservice URL
    * @type String
    */
    exports.mediaApi = '/api/instagramitem';

    /**
    * Order by most recent
    * @type Number
    */
    exports.orderBy = 'CreateDate desc';

    /**
    * Size of the page
    * @type Number
    */
    exports.pageSize = 12;

    /**
    * Amount of pages to show in the paginator
    * @type Number
    */
    exports.pageGroupSize = 5;

    /**
    * Initial page by default
    * @type Number
    */
    exports.firstPage = 1;
});
