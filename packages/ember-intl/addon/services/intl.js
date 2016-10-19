/* global requirejs */

/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

import Ember from 'ember';
import getOwner from 'ember-getowner-polyfill';

import assign from '../utils/assign';
import isArrayEqual from '../utils/is-equal';

const { assert, computed, makeArray, get, set, Service, Evented } = Ember;
const TRANSLATION_PATH_CAPTURE = /\/translations\/(.+)$/;

export function formatterProxy(formatType) {
  return function (value, options, formats) {
    if (!options) {
      if (arguments.length > 1) {
        Ember.warn(`[ember-intl] expected object for formatter ${formatType} but received ${typeof options}`, false, {
          id: 'ember-intl-missing-formatter-args'
        });
      }

      options = {};
    }

    const formatter = this.lookupFormatter(formatType);

    if (typeof options.format === 'string') {
      options = assign({}, this.getFormat(formatType, options.format), options);
    }

    if (!formats) {
      formats = get(this, 'formats');
    }

    return formatter.compute(value, options, {
      formats: formats,
      locale: options.locale || get(this, '_locale')
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
      return getOwner(this).lookup('ember-intl@adapter:default');
    }
  }),

  formats: computed({
    get() {
      const formats = getOwner(this).resolveRegistration('formats:main');

      if (Ember.Object.detect(formats)) {
        return formats.create();
      }

      return formats;
    }
  }),

  formatHtmlMessage: formatterProxy('html-message'),
  formatMessage: formatterProxy('message'),
  formatNumber: formatterProxy('number'),
  formatTime: formatterProxy('time'),
  formatDate: formatterProxy('date'),

  t(key, ...args) {
    const [ options ] = args;
    const translation = this.findTranslationByKey(key, options && options.locale);

    return this.formatMessage(translation, ...args);
  },

  exists(key, optionalLocales) {
    let locales = optionalLocales;
    const adapter = get(this, 'adapter');

    if (!optionalLocales) {
      locales = get(this, '_locale');
    }

    assert(`[ember-intl] locale is unset, cannot lookup '${key}'`, locales);

    return makeArray(locales).some((locale) => adapter.has(locale, key));
  },

  addTranslation(locale, key, value) {
    const translations = this.translationsFor(locale, true);

    return translations.add(key, value);
  },

  addTranslations(locale, hash) {
    const translations = this.translationsFor(locale, true);

    return translations.add(hash);
  },

  setLocale(locales) {
    if (!locales) { return; }

    const proposed = makeArray(locales);
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

  translationsFor(locale, createIfMissing) {
    const translations = get(this, 'adapter').translationsFor(locale, createIfMissing);

    if (typeof translations === 'undefined') {
      throw new Error(`'locale' must be a string or a locale instance`);
    }

    return translations;
  },

  findTranslationByKey(key, locales) {
    locales = locales || get(this, '_locale');

    const translation = get(this, 'adapter').findTranslationByKey(makeArray(locales), key);

    if (typeof translation === 'undefined') {
      const missingMessage = getOwner(this).resolveRegistration('util:intl/missing-message');

      return missingMessage.call(this, key, locales);
    }

    return translation;
  },

  getLocalesByTranslations() {
    return Object.keys(requirejs.entries).reduce((translations, module) => {
      const match = module.match(TRANSLATION_PATH_CAPTURE);

      if (match) {
        translations.addObject(match[1]);
      }

      return translations;
    }, Ember.A());
  },

  lookupFormatter(formatType) {
    const owner = getOwner(this);
    const lookupName = `intl-formatter:${formatType}`;

    if (owner.hasRegistration(lookupName)) {
      return owner.lookup(lookupName);
    }

    return owner.lookup(`ember-intl@formatter:${formatType}`);
  }
});

export default IntlService;
