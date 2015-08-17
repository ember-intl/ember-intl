/* jshint node: true */

module.exports = function(environment) {
    var ENV = {
        modulePrefix: 'dummy',
        environment: environment,
        baseURL: '/',
        locationType: 'auto',

        APP: {
          // Here you can pass flags/options to your application instance
          // when it is created
        },

        intl: {
            locales: ['en-us', 'es-es', 'fr-fr', 'de-de'],
            defaultLocale: 'en-us',
            disablePolyfill: false,
            outputPath: 'dummy/translations',
            inputPath: 'tests/dummy/translations'
        }
    };

    if (environment === 'development') {
        // ENV.APP.LOG_RESOLVER = true;
        // ENV.APP.LOG_ACTIVE_GENERATION = true;
        // ENV.APP.LOG_TRANSITIONS = true;
        // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
        // ENV.APP.LOG_VIEW_LOOKUPS = true;
    }

    if (environment === 'test') {
        // Testem prefers this...
        ENV.baseURL = '/';
        ENV.locationType = 'none';

        // keep test console output quieter
        ENV.APP.LOG_ACTIVE_GENERATION = false;
        ENV.APP.LOG_VIEW_LOOKUPS = false;

        ENV.APP.rootElement = '#ember-testing';

    }

    if (environment === 'production') {

    }

    return ENV;
};
