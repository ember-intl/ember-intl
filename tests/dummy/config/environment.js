/* jshint node: true */

module.exports = function(environment) {
  var ENV = {
    modulePrefix: 'dummy',
    environment: environment,
    baseURL: '/',
    locationType: 'auto',
    EmberENV: {
      FEATURES: {
        'ember-htmlbars': true
      }
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    }
  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    ENV.APP.LOG_VIEW_LOOKUPS = true;
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

  // example configuration
  ENV.intl = {
    shimUrl:          '/assets/intl/Intl.js',
    shimLocaleData:   '/assets/intl/base-locales/',
    fallbackLocales:   ['en-US'],
    locales:           ['en-US'],

    // Defines the locales to extract CLDR data for
    // by default these files are stored in:
    // /assets/intl/locales
    //
    // However, you can override the by passing `dest`
    // example: en: { locales: ['en'], dest: '/assets/intl/locales' }
    //

    intl: {
      en: { locales: ['en'] },
      fr: { locales: ['fr-FR'] }
    }
  };

  return ENV;
};
