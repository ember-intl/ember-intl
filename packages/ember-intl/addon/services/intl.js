import { getOwner } from '@ember/application';
import { assert } from '@ember/debug';
import { registerDestructor } from '@ember/destroyable';
import { cancel, next } from '@ember/runloop';
import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';
import EventEmitter from 'eventemitter3';

import {
  FormatDate,
  FormatList,
  FormatMessage,
  FormatNumber,
  FormatRelative,
  FormatTime,
} from '../-private/formatters';
import {
  createIntl,
  createIntlCache,
  onFormatjsIntlError,
} from '../-private/utils/formatjs';
import getDOM from '../-private/utils/get-dom';
import hydrate from '../-private/utils/hydrate';
import {
  convertToArray,
  convertToString,
  hasLocaleChanged,
  normalizeLocale,
} from '../-private/utils/locale';
import { flattenKeys } from '../-private/utils/translations';

export default class IntlService extends Service {
  /**
   * Returns an array of registered locale names
   *
   */
  get locales() {
    return Object.keys(this._intls);
  }

  /** @public **/
  set locale(localeName) {
    const proposedLocale = convertToArray(localeName).map(normalizeLocale);

    if (hasLocaleChanged(proposedLocale, this._locale)) {
      this._locale = proposedLocale;

      // eslint-disable-next-line ember/no-runloop
      cancel(this._timer);

      // eslint-disable-next-line ember/no-runloop
      this._timer = next(() => {
        this._ee.emit('localeChanged');
        this._updateDocumentLanguage(this._locale);
      });
    }
  }

  get locale() {
    return this._locale;
  }

  /**
   * Returns the first locale of the currently active locales
   *
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
  _formatters = {
    message: new FormatMessage(),
    relative: new FormatRelative(),
    number: new FormatNumber(),
    time: new FormatTime(),
    date: new FormatDate(),
    list: new FormatList(),
  };

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

    if (!this._formats) {
      this._formats = this._owner.resolveRegistration('formats:main') || {};
    }

    this.getIntl = this.getIntl.bind(this);
    this.getOrCreateIntl = this.getOrCreateIntl.bind(this);

    hydrate(this);
  }

  willDestroy() {
    super.willDestroy(...arguments);

    // eslint-disable-next-line ember/no-runloop
    cancel(this._timer);
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
      const missingMessage = this._owner.resolveRegistration(
        'util:intl/missing-message',
      );

      return missingMessage.call(this, key, localeNames, options);
    }

    return translation;
  }

  /**
   * @private
   */
  getIntl(locale) {
    const resolvedLocale = convertToString(locale);

    return this._intls[resolvedLocale];
  }

  getOrCreateIntl(locale, messages) {
    const resolvedLocale = convertToString(locale);
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
    const { _formats: formats } = this;
    const resolvedLocale = convertToString(locale);

    return createIntl(
      {
        defaultFormats: formats,
        defaultLocale: resolvedLocale,
        formats,
        locale: resolvedLocale,
        messages,
        onError: onFormatjsIntlError,
      },
      this._cache,
    );
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

    keys.forEach((key) => {
      assert(
        `[ember-intl] expected translation key "${key}" to be of type String but received: "${typeof key}"`,
        typeof key === 'string',
      );
    });

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
          options,
        );
      }
    }
  }

  /** @public **/
  exists(key, localeName) {
    const localeNames = this._localeWithDefault(localeName);

    assert(
      `[ember-intl] locale is unset, cannot lookup '${key}'`,
      Array.isArray(localeNames) && localeNames.length,
    );

    return localeNames.some(
      (localeName) => key in (this.getIntl(localeName)?.messages || {}),
    );
  }

  /** @public */
  setLocale(locale) {
    assert(
      `[ember-intl] No locale has been set. See https://ember-intl.github.io/ember-intl/docs/quickstart#4-configure-project`,
      locale,
    );

    this.locale = locale;
    this.getOrCreateIntl(locale);
  }

  /** @public **/
  addTranslations(localeName, payload) {
    const locale = normalizeLocale(localeName);
    const messages = flattenKeys(payload);

    this.getOrCreateIntl(locale, messages);
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

    return convertToArray(localeName).map(normalizeLocale);
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

  /**
   * @private
   * @param fn
   * @param context
   */
  onLocaleChanged(fn, context) {
    this._ee.on('localeChanged', fn, context);

    registerDestructor(context, () => {
      this._ee.off('localeChanged', fn, context);
    });
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
