/* globals Intl */

/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

import IntlRelativeFormat from 'intl-relativeformat';
import IntlMessageFormat from 'intl-messageformat';
import { getOwner } from '@ember/application';
import { computed, get, set } from '@ember/object';
import Evented from '@ember/object/evented';
import { assert, warn } from '@ember/debug';
import { makeArray } from '@ember/array';
import Service from '@ember/service';

import { FormatDate, FormatMessage, FormatNumber, FormatRelative, FormatTime } from '../-private/formatters';
import isArrayEqual from '../-private/is-array-equal';
import normalizeLocale from '../-private/normalize-locale';
import links from '../utils/links';
import hydrate from '../hydrate';

export default Service.extend(Evented, {
  /** @private **/
  _locale: ['en-us'],

  /** @private **/
  _adapter: null,

  /** @public **/
  formats: null,

  /** @public **/
  locale: computed({
    set(_, localeName) {
      const proposed = makeArray(localeName).map(normalizeLocale);

      if (!isArrayEqual(proposed, this._locale)) {
        this._locale = proposed;
        this.trigger('localeChanged');

        return this._locale;
      }

      return this._locale;
    },
    get() {
      return this._locale;
    }
  }),

  /** @public **/
  formatRelative: formatter('relative'),

  /** @public **/
  formatMessage: formatter('message'),

  /** @public **/
  formatNumber: formatter('number'),

  /** @public **/
  formatTime: formatter('time'),

  /** @public **/
  formatDate: formatter('date'),

  /**
   * Returns an array of registered locale names
   *
   * @property locales
   * @public
   */
  locales: computed.readOnly('_adapter.locales'),

  /** @public **/
  init() {
    this._super();

    if (typeof Intl === 'undefined') {
      warn(`[ember-intl] Intl API was not found.\nSee: ${links.polyfill}`, false, {
        id: 'ember-intl-undefined-intljs'
      });
    }

    this._owner = getOwner(this);
    this._adapter = this._owner.lookup('ember-intl@adapter:default');

    this._formatters = {
      message: new FormatMessage(),
      relative: new FormatRelative(),
      number: new FormatNumber(),
      time: new FormatTime(),
      date: new FormatDate()
    };

    if (!this.formats) {
      this.formats = this._owner.resolveRegistration('formats:main') || {};
    }

    hydrate(this, this._owner);
  },

  /** @public **/
  lookup(key, localeName, options = {}) {
    const localeNames = this.localeWithDefault(localeName);
    const translation = this._adapter.lookup(localeNames, key);

    if (!options.resilient && translation === undefined) {
      const missingMessage = this._owner.resolveRegistration('util:intl/missing-message');

      return missingMessage.call(this, key, localeNames);
    }

    return translation;
  },

  /** @public **/
  t(key, options = {}) {
    let defaults = [key];
    let msg;

    if (options.default) {
      defaults = defaults.concat(options.default);
    }

    while (!msg && defaults.length) {
      msg = this.lookup(defaults.shift(), options.locale, {
        resilient: defaults.length
      });
    }

    return this.formatMessage(msg, options);
  },

  /** @public **/
  exists(key, localeName) {
    const localeNames = this.localeWithDefault(localeName);

    assert(`[ember-intl] locale is unset, cannot lookup '${key}'`, Array.isArray(localeNames) && localeNames.length);

    return localeNames.some(localeName => this._adapter.has(localeName, key));
  },

  /** @public */
  setLocale(locale) {
    set(this, 'locale', locale);
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

  /** @public **/
  addTranslations(localeName, payload) {
    const locale = this.translationsFor(localeName);

    return locale.addTranslations(payload);
  },

  /** @public **/
  translationsFor(localeName) {
    return this._adapter.localeFactory(normalizeLocale(localeName));
  },

  /** @private **/
  getFormat(formatType, format) {
    const formats = get(this, 'formats');

    if (formats && formatType && typeof format === 'string') {
      return get(formats, `${formatType}.${format}`);
    }
  },

  /** @private **/
  localeWithDefault(localeName) {
    if (!localeName) {
      return this._locale || [];
    }

    if (typeof localeName === 'string') {
      return makeArray(localeName).map(normalizeLocale);
    }

    if (Array.isArray(localeName)) {
      return localeName.map(normalizeLocale);
    }
  }
});

function formatter(name) {
  return function(value, options, formats) {
    let formatOptions = options;

    if (options && typeof options.format === 'string') {
      formatOptions = Object.assign({}, this.getFormat(name, formatOptions.format), formatOptions);
    }

    return this._formatters[name].format(value, formatOptions, {
      formats: formats || this.formats,
      locale: this.localeWithDefault(formatOptions && formatOptions.locale)
    });
  };
}
