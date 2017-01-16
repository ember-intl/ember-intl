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

    let formatter = this._owner.lookup(`ember-intl@formatter:format-${formatType}`);
    let locale;

    if (options.locale) {
      locale = makeArray(options.locale).map(normalizeLocale);
      locale.forEach(this._registerLocale, this);
    } else {
      locale = get(this, '_locale');
    }

    return formatter.format(value, options, {
      formats: formats || get(this, 'formats'),
      locale: locale
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
    this._super(...arguments);

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

    const cache = this._registered[localeName];
    if (cache.cldr && cache.translation) {
      return;
    }

    if (!cache.cldr) {
      cache.cldr = true;
      this._hydrateCLDR(localeName);
    }

    if (!cache.translation) {
      cache.translation = true;
      this._hydateTranslations(localeName);
    }
  },

  _hydateTranslations(localeName) {
    const translations = this._owner.resolveRegistration('translation:' + localeName);
    if (translations) {
      this.addTranslations(localeName, translations);
    }
  },

  _hydrateCLDR(localeName) {
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

  lookup(key, localeName, options = {}) {
    let locales;
    if (localeName) {
      locales = makeArray(localeName).map(normalizeLocale);
      locales.forEach(this._registerLocale, this);
    } else {
      locales = get(this, '_locale');
    }

    let translation = get(this, 'adapter').lookup(locales, key);

    if (!translation && !options.resilient) {
      let missingMessage = this._owner.resolveRegistration('util:intl/missing-message');

      return missingMessage.call(this, key, locales);
    }

    return translation;
  },

  t(key, ...args) {
    const [ options ] = args;
    const translation = this.lookup(key, options && options.locale);

    return this.formatMessage(translation, ...args);
  },

  exists(key, optionalLocaleNames) {
    let localeNames = optionalLocaleNames;
    let adapter = get(this, 'adapter');

    if (!optionalLocaleNames) {
      localeNames = get(this, '_locale');
    }

    assert(`[ember-intl] locale is unset, cannot lookup '${key}'`, localeNames);

    return makeArray(localeNames).some((localeName) => {
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

  addTranslation(localeName, key, value) {
    return this.localeFactory(localeName).addTranslation(key, value);
  },

  addTranslations(localeName, payload) {
    return this.localeFactory(localeName).addTranslations(payload);
  },

  setLocale(locales) {
    if (!locales) { return; }

    const proposed = makeArray(locales).map(normalizeLocale);
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

  localeFactory(locale) {
    return get(this, 'adapter').localeFactory(locale, true);
  },

  findTranslationByKey() {
    return this.lookup(...arguments);
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
