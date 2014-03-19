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