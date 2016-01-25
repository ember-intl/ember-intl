/* global requirejs */

/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

import Ember from 'ember';
import getOwner from 'ember-getowner-polyfill';
import IntlMessageFormat from 'intl-messageformat';
import IntlRelativeFormat from 'intl-relativeformat';

import extend from '../utils/extend';

const { assert, computed, makeArray, get, set, RSVP, Service, Evented, Logger:logger } = Ember;
const TRANSLATION_PATH_CAPTURE = /\/translations\/(.+)$/;

function formatterProxy(formatType) {
  return function (value, options = {}, formats = null) {
    const owner = getOwner(this);
    const formatter = owner.lookup(`ember-intl@formatter:format-${formatType}`);

    if (typeof options.format === 'string') {
      options = extend(this.getFormat(formatType, options.format), options);
    }

    if (!options.locale) {
      options.locale = get(this, '_locale');
    }

    if (!formats) {
      formats = get(this, 'formats');
    }

    return formatter.format(value, options, formats);
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
  formatRelative: formatterProxy('relative'),
  formatMessage: formatterProxy('message'),
  formatNumber: formatterProxy('number'),
  formatTime: formatterProxy('time'),
  formatDate: formatterProxy('date'),

  t(key, options, formats) {
    let translation = this.findTranslationByKey(key, options && options.locale);

    return this.formatMessage(translation, options, formats);
  },

  exists(key, optionalLocales) {
    let locales = optionalLocales;

    if (!optionalLocales) {
      locales = get(this, '_locale');
    }

    assert(`ember-intl: locale is unset, cannot lookup '${key}'`, locales);

    return makeArray(locales).some((locale) => {
      return get(this, 'adapter').has(locale, key);
    });
  },

  getLocalesByTranslations() {
    return Object.keys(requirejs.entries).reduce((translations, module) => {
      let match = module.match(TRANSLATION_PATH_CAPTURE);

      if (match) {
        translations.addObject(match[1]);
      }

      return translations;
    }, Ember.A());
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
    return this.translationsFor(locale).then((localeInstance) => {
      return localeInstance.addTranslation(key, value);
    });
  },

  addTranslations(locale, payload) {
    return this.translationsFor(locale).then((localeInstance) => {
      return localeInstance.addTranslations(payload);
    });
  },

  createLocale(locale, payload) {
    logger.warn('`createLocale` is deprecated, use `addTranslations`');

    return this.addTranslations(locale, payload);
  },

  setLocale(locales) {
    set(this, '_locale', makeArray(locales));
    this.trigger('localeChanged');
  },

  getFormat(formatType, format) {
    const formats = get(this, 'formats');

    if (formats && formatType && typeof format === 'string') {
      return get(formats, `${formatType}.${format}`);
    }

    return {};
  },

  translationsFor(locale) {
    const result = get(this, 'adapter').translationsFor(locale);

    return RSVP.cast(result).then((localeInstance) => {
      if (typeof localeInstance === 'undefined') {
        throw new Error(`'locale' must be a string or a locale instance`);
      }

      return localeInstance;
    });
  },

  findTranslationByKey(key, locales) {
    locales = locales || get(this, '_locale');

    let translation = get(this, 'adapter').findTranslationByKey(makeArray(locales), key);

    if (typeof translation === 'undefined') {
      const missingMessage = getOwner(this).resolveRegistration('util:intl/missing-message');
      translation = missingMessage.call(this, key, locales);
    }

    return translation;
  }
});

export default IntlService;
