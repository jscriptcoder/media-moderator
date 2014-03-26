/**
 * We'll define all the configuration parameters in here
 * @module config
 */

/**
 * Title of the application
 * @type String
 */
export var appTitle = 'Media Monitor';

/**
 * Name of the application
 * @type String
 */
export var appName = 'mediaMonitor';

/**
 * Status webservice URL
 * @type String
 */
export var statusApi = '/api/status';

/**
 * Media webservice URL
 * @type String
 */
export var mediaApi = '/api/instagramitem';

/**
 * Order by most recent
 * @type Number
 */
export var orderBy = 'CreateDate desc';

/**
 * Size of the page
 * @type Number
 */
export var pageSize = 12;

/**
 * Amount of pages to show in the paginator
 * @type Number
 */
export var pageGroupSize = 5;

/**
 * Initial page by default
 * @type Number
 */
export var firstPage = 1;

/**
 * Icon class for pictures
 * @type String
 */
export var clsIcoPicture = 'glyphicon-picture';

/**
 * Icon class for videos
 * @type String
 */
export var clsIcoVideo = 'glyphicon-facetime-video';

/**
 * URL to the media provider (Facebook, Instagram, Flickr, etc...)
 * @type String
 */
export var urlProvider = 'http://instagram.com/';

/**
 * Mapping statusId and class. Not the best way but it does the job since it'll never change
 * @type String
 */
export var clsStatuses = {
    1: { ico: 'glyphicon-question-sign', button: 'btn-warning' }, // Pending
    2: { ico: 'glyphicon-ok-sign', button: 'btn-success' }, // Approved
    3: { ico: 'glyphicon-remove-sign', button: 'btn-danger' } // Rejected
};