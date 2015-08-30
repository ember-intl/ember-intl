/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

import Ember from 'ember';
import computed from 'ember-new-computed';
import extend from '../utils/extend';
import Translation from '../models/translation';

const { assert, get, set, RSVP, Service, Evented, Logger:logger } = Ember;

function formatterProxy (formatType) {
  return function (value, options = {}) {
    const formatter = this.container.lookup(`ember-intl@formatter:format-${formatType}`);

    if (typeof options.format === 'string') {
      options = extend(this.getFormat(formatType, options.format), options);
    }

    if (!options.locale) {
      options.locale = get(this, '_locale');
    }

    return formatter.format(value, options);
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

  formatRelative: formatterProxy('relative'),
  formatMessage: formatterProxy('message'),
  formatHtmlMessage: formatterProxy('html-message'),
  formatNumber: formatterProxy('number'),
  formatTime: formatterProxy('time'),
  formatDate: formatterProxy('date'),

  adapter: computed({
    get() {
      return this.container.lookup('ember-intl@adapter:-intl-adapter');
    }
  }),

  formats: computed({
    get() {
      const formats = this.container.lookupFactory('formats:main');

      if (Ember.Object.detect(formats)) {
        return formats.create();
      }

      return formats;
    }
  }),

  addMessage(...args) {
    logger.warn('`addMessage` is deprecated in favor of `addTranslation`');
    return this.addTranslation(...args);
  },

  addMessages(...args) {
    logger.warn('`addMessages` is deprecated in favor of `addTranslations`');
    return this.addTranslations(...args);
  },

  exists(key) {
    const locale = get(this, '_locale');
    assert('ember-intl: Cannot check existance when locale is null || undefined', locale);
    return get(this, 'adapter').findTranslationByKey(locale, key);
  },

  addTranslation(locale, key, value) {
    return this.translationsFor(locale).then((localeInstance) => {
      return localeInstance.addMessage(key, value);
    });
  },

  addTranslations(locale, payload) {
    return this.translationsFor(locale).then((localeInstance) => {
      return localeInstance.addMessages(payload);
    });
  },

  setLocale(locale) {
    set(this, '_locale', locale);
    this.trigger('localeChanged');
  },

  createLocale(locale, payload) {
    let container = this.container;
    const name = `ember-intl@translation:${locale}`;
    const instance = this.container.lookup('application:main') || {};

    if (instance.registry) {
      container = instance.registry;
    } else if (container.registry && container.registry.register) {
      container = container.registry;
    }

    if (container.has(name)) {
      container.unregister(name);
    }

    container.register(name, Translation.extend(payload));
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
      throw new Error(`translation: '${key}' on locale: '${_locale}' was not found.`);
    }

    return translation;
  }
});

export default IntlService;
