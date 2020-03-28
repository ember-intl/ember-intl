/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
import { getOwner } from '@ember/application';
import { computed, get, set } from '@ember/object';
import Evented from '@ember/object/evented';
import { assert } from '@ember/debug';
import { makeArray } from '@ember/array';
import { assign } from '@ember/polyfills';
import Service from '@ember/service';
import { next, cancel } from '@ember/runloop';

import { FormatDate, FormatMessage, FormatNumber, FormatRelative, FormatTime } from '../-private/formatters';
import isArrayEqual from '../-private/utils/is-array-equal';
import normalizeLocale from '../-private/utils/normalize-locale';
import getDOM from '../-private/utils/get-dom';
import hydrate from '../-private/utils/hydrate';
import TranslationContainer from '../-private/store/container';

export default Service.extend(Evented, {
  /** @public **/
  formats: null,

  /**
   * Returns an array of registered locale names
   *
   * @property locales
   * @public
   */
  locales: computed.readOnly('_translationContainer.locales'),

  /** @public **/
  locale: computed({
    set(_, localeName) {
      const proposed = makeArray(localeName).map(normalizeLocale);

      if (!isArrayEqual(proposed, this._locale)) {
        this._locale = proposed;
        cancel(this._timer);
        this._timer = next(() => this.trigger('localeChanged'));
        this._updateDocumentLanguage(this._locale);
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

  /** @private **/
  _translationContainer: null,

  /** @private **/
  _locale: null,

  /** @private **/
  _timer: null,

  /** @private **/
  _formatters: null,

  /** @public **/
  init() {
    this._super(...arguments);

    const initialLocale = get(this, 'locale') || ['en-us'];

    this.setLocale(initialLocale);
    this._owner = getOwner(this);
    this._translationContainer = TranslationContainer.create();
    this._formatters = this._createFormatters();

    if (!this.formats) {
      this.formats = this._owner.resolveRegistration('formats:main') || {};
    }

    hydrate(this, this._owner);
  },

  willDestroy() {
    this._super(...arguments);
    cancel(this._timer);
  },

  onError({ /* kind, */ error }) {
    if (error) {
      throw error;
    }
  },

  /** @public **/
  lookup(key, localeName, options = {}) {
    const localeNames = this._localeWithDefault(localeName);
    let translation;

    for (let i = 0; i < localeNames.length; i++) {
      translation = this._translationContainer.lookup(localeNames[i], key);

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
    let ast;

    if (options.default) {
      defaults = defaults.concat(options.default);
    }

    while (!ast && defaults.length) {
      ast = this.lookup(defaults.shift(), options.locale, assign({}, options, { resilient: defaults.length > 0 }));
    }

    return this.formatMessage(ast, options);
  },

  /** @public **/
  exists(key, localeName) {
    const localeNames = this._localeWithDefault(localeName);

    assert(`[ember-intl] locale is unset, cannot lookup '${key}'`, Array.isArray(localeNames) && localeNames.length);

    return localeNames.some((localeName) => this._translationContainer.has(localeName, key));
  },

  /** @public */
  setLocale(locale) {
    set(this, 'locale', locale);
  },

  /** @public **/
  addTranslations(localeName, payload) {
    this._translationContainer.push(normalizeLocale(localeName), payload);
  },

  /** @public **/
  translationsFor(localeName) {
    return this._translationContainer.lookupTranslationObject(normalizeLocale(localeName), false);
  },

  /** @private **/
  _localeWithDefault(localeName) {
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
  _updateDocumentLanguage(locales) {
    const dom = getDOM(this);

    if (dom) {
      const [primaryLocale] = locales;
      const html = dom.documentElement;
      html.setAttribute('lang', primaryLocale);
    }
  },

  /** @private */
  _createFormatters() {
    const formatterConfig = {
      onError: this.onError.bind(this),
      readFormatConfig: () => this.formats,
    };

    return {
      message: new FormatMessage(formatterConfig),
      relative: new FormatRelative(formatterConfig),
      number: new FormatNumber(formatterConfig),
      time: new FormatTime(formatterConfig),
      date: new FormatDate(formatterConfig),
    };
  },
});

function formatter(name) {
  return function (value, formatOptions) {
    let locale;

    // TODO: this should not be here
    if (formatOptions && formatOptions.locale) {
      locale = this._localeWithDefault(formatOptions && formatOptions.locale);
    } else {
      locale = get(this, 'locale');
    }

    return this._formatters[name].format(locale, value, formatOptions);
  };
}
