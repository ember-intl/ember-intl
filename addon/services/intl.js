/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

import IntlRelativeFormat from '@ember-intl/intl-relativeformat';
import IntlMessageFormat from '@ember-intl/intl-messageformat';
import { getOwner } from '@ember/application';
import { computed, get, set } from '@ember/object';
import Evented from '@ember/object/evented';
import { assert, warn } from '@ember/debug';
import { makeArray } from '@ember/array';
import { assign } from '@ember/polyfills';
import Service from '@ember/service';
import { next, cancel } from '@ember/runloop';

import { FormatDate, FormatMessage, FormatNumber, FormatRelative, FormatTime } from '../-private/formatters';
import isArrayEqual from '../-private/is-array-equal';
import normalizeLocale from '../-private/normalize-locale';
import hydrate from '../hydrate';
import getDOM from '../utils/get-dom';

export default Service.extend(Evented, {
  /** @private **/
  _locale: null,

  /** @private **/
  _adapter: null,

  /** @public **/
  formats: null,

  /** @private **/
  _timer: null,

  /** @public **/
  locale: computed({
    set(_, localeName) {
      const proposed = makeArray(localeName).map(normalizeLocale);

      if (!isArrayEqual(proposed, this._locale)) {
        this._locale = proposed;
        cancel(this._timer);
        this._timer = next(() => this.trigger('localeChanged'));
        this.updateDocumentLanguage(this._locale);
      }

      return this._locale;
    },
    get() {
      return this._locale;
    },
  }),

  /**
   * Returns the first locale of the currently active locales
   *
   * @property primaryLocale
   * @public
   */
  primaryLocale: computed.readOnly('locale.0'),

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
    this._super(...arguments);

    warn('[ember-intl] Intl API does not exist in this environment.  A polyfill of `Intl` is required.', Intl, {
      id: 'ember-intl-undefined-intljs',
    });

    const initialLocale = get(this, 'locale') || ['en-us'];

    this.setLocale(initialLocale);
    this._owner = getOwner(this);
    this._adapter = this._owner.lookup('ember-intl@adapter:default');

    this._formatters = {
      message: new FormatMessage(),
      relative: new FormatRelative(),
      number: new FormatNumber(),
      time: new FormatTime(),
      date: new FormatDate(),
    };

    if (!this.formats) {
      this.formats = this._owner.resolveRegistration('formats:main') || {};
    }

    hydrate(this, this._owner);
  },

  willDestroy() {
    this._super(...arguments);
    cancel(this._timer);
  },

  /** @public **/
  lookup(key, localeName, options = {}) {
    const localeNames = this.localeWithDefault(localeName);
    let translation;

    for (let i = 0; i < localeNames.length; i++) {
      translation = this._adapter.lookup(localeNames[i], key);

      if (translation !== undefined) {
        break;
      }
    }

    if (!options.resilient && translation === undefined) {
      const missingMessage = this._owner.resolveRegistration('util:intl/missing-message');

      return missingMessage.call(this, key, localeNames, options);
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
      msg = this.lookup(defaults.shift(), options.locale, assign({}, options, { resilient: defaults.length > 0 }));
    }

    /* Avoids passing msg to intl-messageformat if it is not a string */
    if (typeof msg === 'string') {
      return this.formatMessage(msg, options);
    }

    return msg;
  },

  /** @public **/
  exists(key, localeName) {
    const localeNames = this.localeWithDefault(localeName);

    assert(`[ember-intl] locale is unset, cannot lookup '${key}'`, Array.isArray(localeNames) && localeNames.length);

    return localeNames.some((localeName) => this._adapter.has(localeName, key));
  },

  /** @public */
  setLocale(locale) {
    set(this, 'locale', locale);
  },

  /**
   * A utility method for registering CLDR data against
   * intl-messageformat and intl-relativeformat.
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

    locale.addTranslations(payload);
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
  },

  /** @private **/
  updateDocumentLanguage(locales) {
    const dom = getDOM(this);

    if (dom) {
      const [primaryLocale] = locales;
      const html = dom.documentElement;
      html.setAttribute('lang', primaryLocale);
    }
  },
});

function formatter(name) {
  return function (value, options, formats) {
    let formatOptions = options;

    if (options && typeof options.format === 'string') {
      formatOptions = assign({}, this.getFormat(name, formatOptions.format), formatOptions);
    }

    return this._formatters[name].format(value, formatOptions, {
      formats: formats || this.formats,
      locale: this.localeWithDefault(formatOptions && formatOptions.locale),
    });
  };
}
