/* globals Intl */

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

const {
  assert,
  getOwner,
  computed,
  makeArray,
  get,
  set,
  Service,
  Evented,
  deprecate
} = Ember;

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

    if (typeof options.format === 'string') {
      options = assign(assign({}, this.getFormat(formatType, options.format)), options);
    }

    const formatter = this._owner.lookup(`ember-intl@formatter:format-${formatType}`);

    return formatter.format(value, options, {
      formats: formats || get(this, 'formats'),
      locale: this._localeWithDefault(options.locale)
    });
  };
}

const IntlService = Service.extend(Evented, {
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
      return this._owner.lookup('ember-intl@adapter:default');
    }
  }),

  formats: computed({
    get() {
      return this._owner.resolveRegistration('formats:main');
    }
  }),

  formatHtmlMessage: formatterProxy('html-message'),
  formatRelative: formatterProxy('relative'),
  formatMessage: formatterProxy('message'),
  formatNumber: formatterProxy('number'),
  formatTime: formatterProxy('time'),
  formatDate: formatterProxy('date'),

  init() {
    this._super();

    this._owner = getOwner(this);
    this._registered = Object.create(null);

    if (typeof Intl === 'undefined') {
      Ember.warn(`[ember-intl] Intl API is unavailable in this environment.\nSee: ${links.polyfill}`, false, {
        id: 'ember-intl-undefined-intljs'
      });
    }
  },

  locales() {
    return get(this, 'adapter').locales();
  },

  _registerLocale(localeName) {
    if (!this._registered[localeName]) {
      this._registered[localeName] = Object.create(null);
    }

    const localeMeta = this._registered[localeName];
    if (localeMeta.cldr && localeMeta.translation) {
      return;
    }

    if (!localeMeta.cldr) {
      localeMeta.cldr = true;
      this._hydrateBundledCLDR(localeName);
    }

    if (!localeMeta.translation) {
      localeMeta.translation = true;
      this._hydateBundledTranslations(localeName);
    }
  },

  _hydateBundledTranslations(localeName) {
    const translations = this._owner.resolveRegistration(`translation:${localeName}`);
    if (translations) {
      this.addTranslations(localeName, translations);
    }
  },

  _hydrateBundledCLDR(localeName) {
    const lang = localeName.split('-')[0];
    const cldr = this._owner.resolveRegistration(`cldr:${lang}`);

    if (cldr) {
      if (Array.isArray(cldr)) {
        cldr.forEach(this.addLocaleData);
      } else {
        this.addLocaleData(cldr);
      }
    }
  },

  _localeWithDefault(localeName) {
    if (!localeName) {
      return get(this, '_locale');
    }

    if (typeof localeName === 'string') {
      localeName = makeArray(localeName).map(normalizeLocale);
    }

    if (Array.isArray(localeName)) {
      localeName.forEach(this._registerLocale, this);
    }

    return localeName;
  },

  lookup(key, localeName, options = {}) {
    const localeNames = this._localeWithDefault(localeName);
    const translation = get(this, 'adapter').lookup(localeNames, key);

    if (!translation && !options.resilient) {
      const missingMessage = this._owner.resolveRegistration('util:intl/missing-message');

      return missingMessage.call(this, key, localeNames);
    }

    return translation;
  },

  t(key, ...args) {
    const [ options ] = args;
    const translation = this.lookup(key, options && options.locale);

    return this.formatMessage(translation, ...args);
  },

  exists(key, localeName) {
    const localeNames = this._localeWithDefault(localeName);
    const adapter = get(this, 'adapter');

    assert(`[ember-intl] locale is unset, cannot lookup '${key}'`, Array.isArray(localeNames) && localeNames.length);

    return localeNames.some((localeName) => {
      return adapter.has(localeName, key);
    });
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

  localeFactory(locale) {
    return get(this, 'adapter').localeFactory(normalizeLocale(locale), true);
  },

  addTranslation(localeName, key, value) {
    return this.localeFactory(localeName).addTranslation(key, value);
  },

  addTranslations(localeName, payload) {
    return this.localeFactory(localeName).addTranslations(payload);
  },

  setLocale(localeName) {
    if (!localeName) { return; }

    const proposed = makeArray(localeName).map(normalizeLocale);
    const current = get(this, '_locale');

    if (!isArrayEqual(proposed, current)) {
      proposed.forEach(this._registerLocale, this);
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

  findTranslationByKey(key, localeName, options) {
    return this.lookup(key, localeName, options);
  },

  /* DEPRECATIONS BELOW */
  getLocalesByTranslations() {
    deprecate('[ember-intl] `getLocalesByTranslations` is deprecated, use `locales`', false, {
      id: 'ember-intl-locales-cp'
    });

    return this.locales();
  }
});

export default IntlService;
