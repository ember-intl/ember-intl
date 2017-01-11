/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

import Ember from 'ember';
import IntlMessageFormat from 'intl-messageformat';
import IntlRelativeFormat from 'intl-relativeformat';

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

    const owner = getOwner(this);
    const formatter = owner.lookup(`ember-intl@formatter:format-${formatType}`);

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

  /**
   * Returns an array of registered locale names
   *
   * @property locales
   * @public
   */
  locales: computed('adapter.seen.[]', function() {
    return get(this, 'adapter.seen').map(l => l.localeName);
  }).readOnly(),

  lookup(key, localeName) {
    const localeNames = makeArray(localeName || get(this, '_locale'));
    const translation = get(this, 'adapter').lookup(localeNames, key);

    if (!translation) {
      const missingMessage = getOwner(this).resolveRegistration('util:intl/missing-message');

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
