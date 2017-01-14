/* globals requirejs, Intl */

/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

import Ember from 'ember';
import IntlMessageFormat from 'intl-messageformat';
import IntlRelativeFormat from 'intl-relativeformat';

import links from '../utils/links';
import isArrayEqual from '../utils/is-equal';
import normalizeLocale from '../utils/normalize-locale';

const { assert, getOwner, computed, makeArray, get, set, RSVP, Service, Evented, deprecate } = Ember;
const assign = Ember.assign || Ember.merge;

function formatterProxy(formatType) {
  return function(value, options, formats) {
    if (!options) {
      if (arguments.length > 1) {
        Ember.warn(`[ember-intl] expected object for formatter ${formatType} but received ${typeof options}`, false, {
          id: 'ember-intl-missing-formatter-args'
        });
      }

      options = {};
    }

    const formatter = this.owner.lookup(`ember-intl@formatter:format-${formatType}`);

    if (typeof options.format === 'string') {
      options = assign(this.getFormat(formatType, options.format), options);
    }


    if (!formats) {
      formats = get(this, 'formats');
    }

    return formatter.format(value, options, {
      formats: formats,
      locale: normalizeLocale(options.locale) || get(this, '_locale')
    });
  };
}

const IntlService = Service.extend(Evented, {
  init() {
    this._super(...arguments);

    this.owner = getOwner(this);

    if (typeof Intl === 'undefined') {
      Ember.warn(`[ember-intl] Intl API is unavailable in this environment.\nSee: ${links.polyfill}`, false, {
        id: 'ember-intl-undefined-intljs'
      });
    }

    this._hydrate();
  },

  _locale: null,

  locale: computed('_locale', {
    set() {
      throw new Error('Use `setLocale` to change the application locale');
    },
    get() {
      return get(this, '_locale');
    }
  }),

  adapter: computed({
    get() {
      return this.owner.lookup('ember-intl@adapter:default');
    }
  }),

  formats: computed({
    get() {
      const formats = this.owner.resolveRegistration('formats:main');

      if (Ember.Object.detect(formats)) {
        return formats.create();
      }

      return formats;
    }
  }),

  formatHtmlMessage: formatterProxy('html-message'),
  formatRelative: formatterProxy('relative'),
  formatMessage: formatterProxy('message'),
  formatNumber: formatterProxy('number'),
  formatTime: formatterProxy('time'),
  formatDate: formatterProxy('date'),
  requirejs: requirejs,

  /**
   * Returns an array of registered locale names
   *
   * @property locales
   * @public
   */
  locales: computed('adapter.seen.[]', function() {
    return get(this, 'adapter.seen').map(l => l.localeName);
  }).readOnly(),

  /**
   * Peeks into the requirejs map and registers all locale data objects found.
   * This is also very likely to be removed soon.
   *
   * @private
   */
  _hydrate() {
    const config = this.owner.resolveRegistration('config:environment');
    const cldrs = this._lookupByFactoryType('cldrs', config.modulePrefix);
    const translations = this._lookupByFactoryType('translations', config.modulePrefix);

    if (!cldrs.length) {
      Ember.warn('[ember-intl] project is missing CLDR data\nIf you are asynchronously loading translation, see: ${links.asyncTranslations}.', false, {
        id: 'ember-intl-missing-cldr-data'
      });
    }

    cldrs.map((name) => this.requirejs(name, null, null, true)['default'])
      .forEach((data) => data.forEach(this.addLocaleData));

    translations.forEach((moduleName) => {
      const splitModuleName = moduleName.split('\/');
      const localeName = splitModuleName[splitModuleName.length - 1];
      this.addTranslations(localeName, this.requirejs(moduleName, null, null, true)['default']);
    });
  },

  _lookupByFactoryType(type, modulePrefix) {
    return Object.keys(this.requirejs._eak_seen).filter((key) => {
      return key.indexOf(`${modulePrefix}\/${type}\/`) === 0;
    });
  },

  lookup(key, localeName) {
    const localeNames = makeArray(localeName || get(this, '_locale'));
    const translation = get(this, 'adapter').lookup(localeNames, key);

    if (!translation) {
      const missingMessage = this.owner.resolveRegistration('util:intl/missing-message');

      return missingMessage.call(this, key, localeNames);
    }

    return translation;
  },

  t(key, ...args) {
    const [ options ] = args;
    const translation = this.lookup(key, options && options.locale);

    return this.formatMessage(translation, ...args);
  },

  exists(key, optionalLocales) {
    let locales = optionalLocales;
    const adapter = get(this, 'adapter');

    if (!optionalLocales) {
      locales = get(this, '_locale');
    }

    assert(`[ember-intl] locale is unset, cannot lookup '${key}'`, locales);

    return makeArray(locales).some((locale) => {
      return adapter.has(locale, key);
    });
  },

  getLocalesByTranslations() {
    deprecate('[ember-intl] `getLocalesByTranslations` is deprecated, use `locales` computed property', false, {
      id: 'ember-intl-locales-cp'
    });

    return get(this, 'locales');
  },

  /**
  * A utility method for registering CLDR data for
  * intl-messageformat and intl-relativeformat.  This data is derived
  * from formatjs-extract-cldr-data
  *
  * @method addLocaleData
  * @param {Object} locale data
  * @public
  */
  addLocaleData(data) {
    IntlMessageFormat.__addLocaleData(data);
    IntlRelativeFormat.__addLocaleData(data);
  },

  addTranslation(locale, key, value) {
    return this.localeFactory(locale).then((localeInstance) => {
      return localeInstance.addTranslation(key, value);
    });
  },

  addTranslations(locale, payload) {
    return this.localeFactory(locale).then((localeInstance) => {
      return localeInstance.addTranslations(payload);
    });
  },

  setLocale(locales) {
    if (!locales) { return; }

    const proposed = makeArray(locales).map(normalizeLocale);
    const current = get(this, '_locale');

    if (!isArrayEqual(proposed, current)) {
      this.propertyWillChange('locale');
      set(this, '_locale', proposed);
      this.propertyDidChange('locale');
      this.trigger('localeChanged');
    }
  },

  getFormat(formatType, format) {
    const formats = get(this, 'formats');

    if (formats && formatType && typeof format === 'string') {
      return get(formats, `${formatType}.${format}`);
    }

    return {};
  },

  localeFactory(locale) {
    const result = get(this, 'adapter').localeFactory(locale, true);

    return RSVP.cast(result).then(function(localeInstance) {
      return localeInstance;
    });
  },

  createLocale(locale, payload) {
    deprecate('[ember-intl] `createLocale` is deprecated, use `addTranslations`', false, {
      id: 'ember-intl-create-locale'
    });

    return this.addTranslations(locale, payload);
  },

  findTranslationByKey() {
    return this.lookup(...arguments);
  },

  translationsFor() {
    return this.localeFactory(...arguments);
  }
});

export default IntlService;
