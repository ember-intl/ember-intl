/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
import { getOwner } from '@ember/application';
import { assert } from '@ember/debug';
import { makeArray } from '@ember/array';
import Service from '@ember/service';
import { next, cancel } from '@ember/runloop';

import {
  FormatDate,
  FormatMessage,
  FormatNumber,
  FormatRelative,
  FormatTime,
  FormatList,
} from '../-private/formatters';
import isArrayEqual from '../-private/utils/is-array-equal';
import normalizeLocale from '../-private/utils/normalize-locale';
import getDOM from '../-private/utils/get-dom';
import hydrate from '../-private/utils/hydrate';
import { createIntl, createIntlCache, IntlErrorCode } from '@formatjs/intl';
import flatten from '../-private/utils/flatten';
import EventEmitter from 'eventemitter3';
import { tracked } from '@glimmer/tracking';
import { dependentKeyCompat } from '@ember/object/compat';

export default class extends Service {
  /**
   * Returns an array of registered locale names
   *
   * @property locales
   * @public
   */
  get locales() {
    return Object.keys(this._intls);
  }

  /** @public **/
  set locale(localeName) {
    const proposed = makeArray(localeName).map(normalizeLocale);

    if (!isArrayEqual(proposed, this._locale)) {
      this._locale = proposed;

      cancel(this._timer);
      this._timer = next(() => {
        this._ee.emit('localeChanged');
        this._updateDocumentLanguage(this._locale);
      });
    }
  }

  @dependentKeyCompat
  get locale() {
    return this._locale;
  }

  /**
   * Returns the first locale of the currently active locales
   *
   * @property primaryLocale
   * @public
   */
  get primaryLocale() {
    return this.locale[0];
  }

  /** @public **/
  formatRelative = createFormatterProxy('relative');

  /** @public **/
  formatMessage = createFormatterProxy('message');

  /** @public **/
  formatNumber = createFormatterProxy('number');

  /** @public **/
  formatTime = createFormatterProxy('time');

  /** @public **/
  formatDate = createFormatterProxy('date');

  /** @public **/
  formatList = createFormatterProxy('list');

  /** @private **/
  @tracked _locale = null;

  /** @private **/
  _timer = null;

  /** @private **/
  _formats = null;

  /** @private **/
  _formatters = null;

  /** @private */
  @tracked _intls = null;

  /**
   * @private
   * @type {EventEmitter}
   */
  _ee = null;

  _cache = createIntlCache();

  /** @public **/
  constructor() {
    super(...arguments);

    const initialLocale = this.locale || ['en-us'];
    this._intls = {};
    this._ee = new EventEmitter();
    this.setLocale(initialLocale);

    this._owner = getOwner(this);
    this._formatters = this._createFormatters();

    if (!this._formats) {
      this._formats = this._owner.resolveRegistration('formats:main') || {};
    }

    this.onIntlError = this.onIntlError.bind(this);
    this.getIntl = this.getIntl.bind(this);
    this.getOrCreateIntl = this.getOrCreateIntl.bind(this);

    hydrate(this);
  }

  willDestroy() {
    super.willDestroy(...arguments);
    cancel(this._timer);
  }

  onIntlError(err) {
    if (err.code !== IntlErrorCode.MISSING_TRANSLATION) {
      throw err;
    }
  }

  /** @private **/
  onError({ /* kind, */ error }) {
    throw error;
  }

  /** @public **/
  lookup(key, localeName, options = {}) {
    const localeNames = this._localeWithDefault(localeName);
    let translation;

    for (let i = 0; i < localeNames.length; i++) {
      const messages = this.translationsFor(localeNames[i]);
      if (!messages) {
        continue;
      }
      translation = messages[key];

      if (translation !== undefined) {
        break;
      }
    }

    if (translation === undefined && options.resilient !== true) {
      const missingMessage = this._owner.resolveRegistration('util:intl/missing-message');

      return missingMessage.call(this, key, localeNames, options);
    }

    return translation;
  }

  /**
   * @private
   */
  getIntl(locale) {
    const resolvedLocale = Array.isArray(locale) ? locale[0] : locale;
    return this._intls[resolvedLocale];
  }

  getOrCreateIntl(locale, messages) {
    const resolvedLocale = Array.isArray(locale) ? locale[0] : locale;
    const existingIntl = this._intls[resolvedLocale];
    if (!existingIntl) {
      this._intls = {
        ...this._intls,
        [resolvedLocale]: this.createIntl(resolvedLocale, messages),
      };
    } else if (messages) {
      this._intls = {
        ...this._intls,
        [resolvedLocale]: this.createIntl(resolvedLocale, {
          ...(existingIntl.messages || {}),
          ...messages,
        }),
      };
    }

    return this._intls[resolvedLocale];
  }

  /**
   * @private
   * @param {String} locale Locale of intl obj to create
   */
  createIntl(locale, messages = {}) {
    const resolvedLocale = Array.isArray(locale) ? locale[0] : locale;
    return createIntl(
      {
        locale: resolvedLocale,
        defaultLocale: resolvedLocale,
        formats: this._formats,
        defaultFormats: this._formats,
        onError: this.onIntlError,
        messages,
      },
      this._cache
    );
  }

  validateKeys(keys) {
    return keys.forEach((key) => {
      assert(
        `[ember-intl] expected translation key "${key}" to be of type String but received: "${typeof key}"`,
        typeof key === 'string'
      );
    });
  }

  /** @public **/
  t(key, options = {}) {
    let keys = [key];

    if (options.default) {
      if (Array.isArray(options.default)) {
        keys = [...keys, ...options.default];
      } else if (typeof options.default === 'string') {
        keys = [...keys, options.default];
      }
    }

    this.validateKeys(keys);

    for (let index = 0; index < keys.length; index++) {
      const key = keys[index];
      const message = this.lookup(key, options.locale, {
        ...options,
        // Note: last iteration will throw with the last key that was missing
        // in the future maybe the thrown error should include all the keys to help debugging
        resilient: keys.length - 1 !== index,
      });

      // @formatjs/intl consider empty message to be an error
      if (message === '' || typeof message === 'number') {
        return message;
      }

      if (message) {
        return this.formatMessage(
          {
            id: key,
            defaultMessage: message,
          },
          options
        );
      }
    }
  }

  /** @public **/
  exists(key, localeName) {
    const localeNames = this._localeWithDefault(localeName);

    assert(`[ember-intl] locale is unset, cannot lookup '${key}'`, Array.isArray(localeNames) && localeNames.length);

    return localeNames.some((localeName) => key in (this.getIntl(localeName)?.messages || {}));
  }

  /** @public */
  setLocale(locale) {
    assert(
      `[ember-intl] no locale has been set!  See: https://ember-intl.github.io/ember-intl/docs/quickstart#4-configure-ember-intl`,
      locale
    );

    this.locale = locale;
    this.getOrCreateIntl(locale);
  }

  /** @public **/
  addTranslations(localeName, payload) {
    const locale = normalizeLocale(localeName);
    this.getOrCreateIntl(locale, flatten(payload));
  }

  /** @public **/
  translationsFor(localeName) {
    const locale = normalizeLocale(localeName);
    return this.getIntl(locale)?.messages;
  }

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
  }

  /** @private **/
  _updateDocumentLanguage(locales) {
    const dom = getDOM(this);

    if (dom) {
      const [primaryLocale] = locales;
      const html = dom.documentElement;
      html.setAttribute('lang', primaryLocale);
    }
  }

  /** @private */
  _createFormatters() {
    return {
      message: new FormatMessage(),
      relative: new FormatRelative(),
      number: new FormatNumber(),
      time: new FormatTime(),
      date: new FormatDate(),
      list: new FormatList(),
    };
  }
  /**
   * @private
   * @param {Function} fn
   * @returns {Function} unsubscribed from localeChanged
   */
  onLocaleChanged(...args) {
    this._ee.on('localeChanged', ...args);
    return () => {
      this._ee.off('localeChanged', ...args);
    };
  }
}

function createFormatterProxy(name) {
  return function serviceFormatterProxy(value, formatOptions) {
    let locale;
    let intl;
    if (formatOptions && formatOptions.locale) {
      locale = this._localeWithDefault(formatOptions.locale);
      // Cannot use getOrCreateIntl since it triggers a re-render which
      // might cause infinite loop
      // This is also a case we're not optimizing for so let it take
      // the slow path
      intl = this.createIntl(locale);
    } else {
      locale = this.locale;
      intl = this.getIntl(locale);
    }

    return this._formatters[name].format(intl, value, formatOptions);
  };
}
