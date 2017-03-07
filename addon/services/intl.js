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
  A:emberArray,
  assign,
  assert,
  getOwner,
  computed,
  makeArray,
  get,
  set,
  Service,
  Evented
} = Ember;

function aliasFormatter(formatType) {
  return function(value, options, formats) {
    if (!options) {
      if (arguments.length > 1) {
        Ember.warn(`[ember-intl] expected object for formatter ${formatType} but received ${typeof options}`, false, {
          id: 'ember-intl-missing-formatter-args'
        });
      }

      options = {};
    }

    if (options.format) {
      let formatterOptions = this.lookupFormat(formatType, options.format);
      if (formatterOptions) {
        options = assign({}, formatterOptions, options);
      }
    }

    let formatter = this._owner.lookup(`ember-intl@formatter:format-${formatType}`);

    return formatter.format(value, options, {
      formats: formats || get(this, 'formats'),
      locale: this.localeWithDefault(options.locale)
    });
  };
}

function hydateBundledTranslations(service, localeName) {
  let translations = service._owner.resolveRegistration(`translation:${localeName}`);

  if (translations) {
    service.addTranslations(localeName, translations);
  }
}

function hydrateBundledCLDR(service, localeName) {
  let lang = localeName.split('-')[0];
  let cldr = service._owner.resolveRegistration(`cldr:${lang}`);

  if (cldr) {
    if (Array.isArray(cldr)) {
      cldr.forEach(service.addLocaleData);
    } else {
      service.addLocaleData(cldr);
    }
  }
}

const IntlService = Service.extend(Evented, {
  /** @private **/
  _locale: null,

  /** @public **/
  locale: computed('_locale', {
    set() {
      throw new Error('[ember-intl] use `intl.setLocale(localeName)` to change the application locale');
    },
    get() {
      return get(this, '_locale');
    }
  }),

  /** @private **/
  adapter: computed({
    get() {
      let applicationAdapter = this._owner.lookup('adapter:ember-intl');

      if (applicationAdapter) {
        return applicationAdapter;
      }

      return this._owner.lookup('ember-intl@adapter:default');
    }
  }),

  /** @private **/
  formats: computed({
    get() {
      return this._owner.resolveRegistration('formats:main');
    }
  }),

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

  /** @public **/
  formatHtmlMessage: aliasFormatter('html-message'),

  /** @public **/
  formatRelative: aliasFormatter('relative'),

  /** @public **/
  formatMessage: aliasFormatter('message'),

  /** @public **/
  formatNumber: aliasFormatter('number'),

  /** @public **/
  formatTime: aliasFormatter('time'),

  /** @public **/
  formatDate: aliasFormatter('date'),

  /** @public **/
  locales() {
    let config = this._owner.resolveRegistration('config:environment')['intl'] || {};
    let adapterLocales = emberArray(get(this, 'adapter').locales());

    if (Array.isArray(config.locales)) {
      return emberArray(emberArray(config.locales).concat(adapterLocales)).uniq();
    }

    return adapterLocales;
  },

  /** @public **/
  lookup(key, localeName, options = {}) {
    let localeNames = this.localeWithDefault(localeName);
    let translation = get(this, 'adapter').lookup(localeNames, key);

    if (!options.resilient && !translation) {
      let missingMessage = this._owner.resolveRegistration('util:intl/missing-message');

      return missingMessage.call(this, key, localeNames);
    }

    return translation;
  },

  /** @public **/
  t(key, ...args) {
    let [ options ] = args;
    let translation = this.lookup(key, options && options.locale);

    return this.formatMessage(translation, ...args);
  },

  /** @public **/
  exists(key, localeName) {
    let localeNames = this.localeWithDefault(localeName);
    assert(`[ember-intl] locale is unset, cannot lookup '${key}'`, Array.isArray(localeNames) && localeNames.length);

    let adapter = get(this, 'adapter');

    return localeNames.some(localeName => adapter.has(localeName, key));
  },

  /** @public **/
  addLocaleData(data) {
    IntlMessageFormat.__addLocaleData(data);
    IntlRelativeFormat.__addLocaleData(data);
  },

  /** @public **/
  addTranslation(localeName, key, value) {
    return this.localeFactory(localeName).addTranslation(key, value);
  },

  /** @public **/
  addTranslations(localeName, hash) {
    return this.localeFactory(localeName).addTranslations(hash);
  },

  /** @public **/
  setLocale(localeName) {
    if (!localeName) { return; }

    let proposed = makeArray(localeName).map(normalizeLocale);
    let current = get(this, '_locale');

    if (!isArrayEqual(proposed, current)) {
      proposed.forEach(this.registerLocale, this);
      this.propertyWillChange('locale');
      set(this, '_locale', proposed);
      this.propertyDidChange('locale');
      this.trigger('localeChanged');
    }
  },

  /** @private **/
  lookupFormat(formatType, format) {
    let formats = get(this, 'formats');

    if (formats && formatType && typeof format === 'string') {
      return get(formats, `${formatType}.${format}`);
    }
  },

  /** @private **/
  localeFactory(localeName) {
    return get(this, 'adapter').localeFactory(normalizeLocale(localeName), true);
  },

  /** @private **/
  registerLocale(localeName) {
    if (!this._registered[localeName]) {
      this._registered[localeName] = Object.create(null);
    }

    let localeMeta = this._registered[localeName];
    if (localeMeta.cldr && localeMeta.translation) {
      return;
    }

    if (!localeMeta.cldr) {
      localeMeta.cldr = true;
      hydrateBundledCLDR(this, localeName);
    }

    if (!localeMeta.translation) {
      localeMeta.translation = true;
      hydateBundledTranslations(this, localeName);
    }
  },

  /** @private **/
  localeWithDefault(localeName) {
    if (!localeName) {
      return get(this, '_locale');
    }

    if (typeof localeName === 'string') {
      localeName = makeArray(localeName).map(normalizeLocale);
    }

    localeName.forEach(this.registerLocale, this);

    return localeName;
  }
});

export default IntlService;
