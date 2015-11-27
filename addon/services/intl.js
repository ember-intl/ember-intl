/* global requirejs */

/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

import Ember from 'ember';
import getOwner from 'ember-getowner-polyfill';

import extend from '../utils/extend';

const { assert, computed, get, set, RSVP, Service, Evented, Logger:logger } = Ember;
const matchKey = '/translations/(.+)$';

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
      return getOwner(this).lookup('ember-intl@adapter:-intl-adapter');
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

  exists(key, optionalLocale) {
    let locale = optionalLocale;

    if (!optionalLocale) {
      locale = this.get('_locale');
    }

    assert(`ember-intl: locale is unset, cannot confirm '${key}' exists`, locale);

    return get(this, 'adapter').has(locale, key);
  },

  getLocalesByTranslations() {
    return Object.keys(requirejs.entries).reduce((translations, module) => {
      let match = module.match(matchKey);

      if (match) {
        translations.addObject(match[1]);
      }

      return translations;
    }, Ember.A());
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

  setLocale(locale) {
    set(this, '_locale', locale);
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

    return RSVP.cast(result).then(function (localeInstance) {
      if (typeof localeInstance === 'undefined') {
        throw new Error(`'locale' must be a string or a locale instance`);
      }

      return localeInstance;
    });
  },

  findTranslationByKey(key, locale) {
    const _locale = locale ? locale : get(this, '_locale');
    const translation = get(this, 'adapter').findTranslationByKey(_locale, key);

    if (typeof translation === 'undefined') {
      Ember.Logger.warn(`translation: '${key}' on locale: '${_locale}' was not found.`);
    }

    return translation;
  }
});

export default IntlService;
