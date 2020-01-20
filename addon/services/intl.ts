/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

import IntlRelativeFormat from '@ember-intl/intl-relativeformat';
import IntlMessageFormat from '@ember-intl/intl-messageformat';
import { getOwner } from '@ember/application';
import { computed, get, set } from '@ember/object';
import ComputedProperty from '@ember/object/computed';
import Evented from '@ember/object/evented';
import { assert, warn } from '@ember/debug';
import { makeArray } from '@ember/array';
import { assign } from '@ember/polyfills';
import Service from '@ember/service';
import { next, cancel } from '@ember/runloop';
import { EmberRunTimer } from '@ember/runloop/types';

import IntlDefaultAdapter from '../adapters/default';
import Formatter, { FormatterOptions, FormatResult } from '../-private/formatters/-base';
import { FormatDate, FormatMessage, FormatNumber, FormatRelative, FormatTime } from '../-private/formatters';
import { Dateish } from '../-private/formatters/format-date';
import isArrayEqual from '../-private/is-array-equal';
import normalizeLocale from '../-private/normalize-locale';
import hydrate from '../hydrate';
import getDOM from '../utils/get-dom';
import { MissingMessage, MissingMessageOptions } from '../utils/missing-message';
import { Translations } from '../models/translation';

type Locale = string[] | null;
type LocaleName = string | string[];

class OverridableProps {
  /** @private **/
  _locale: Locale = null;

  /** @private **/
  _adapter: any = null;

  /** @public **/
  formats: any = null;

  /** @private **/
  _timer?: EmberRunTimer;

  /** @private **/
  _formatters: { [name: string]: Formatter<unknown> } = {
    message: new FormatMessage(),
    relative: new FormatRelative(),
    number: new FormatNumber(),
    time: new FormatTime(),
    date: new FormatDate()
  };

  /** @public **/
  locale: ComputedProperty<Locale, LocaleName> = computed<any>({
    get(this: OverridableProps & IntlService) {
      return this._locale;
    },

    set(this: OverridableProps & IntlService, _, localeName: LocaleName) {
      const proposed = makeArray(localeName).map(normalizeLocale);
      if (!isArrayEqual(proposed, this._locale)) {
        this._locale = proposed;
        if (this._timer) {
          cancel(this._timer);
        }
        this._timer = next(this, this.trigger, 'localeChanged');
        this.updateDocumentLanguage(this._locale);
      }

      return this._locale;
    }
  });

  /**
   * Returns the first locale of the currently active locales
   *
   * @property primaryLocale
   * @public
   */
  primaryLocale = computed.readOnly('locale.0');

  /** @public **/
  formatRelative = formatter<Dateish>('relative');

  /** @public **/
  formatMessage = formatter<string>('message');

  /** @public **/
  formatNumber = formatter<number>('number');

  /** @public **/
  formatTime = formatter<Dateish>('time');

  /** @public **/
  formatDate = formatter<Dateish>('date');

  /**
   * Returns an array of registered locale names
   *
   * @property locales
   * @public
   */
  locales = computed.readOnly('_adapter.locales');

  willDestroy() {
    if (this._timer) {
      cancel(this._timer);
    }
  }
}

export default class IntlService extends Service.extend(Evented, new OverridableProps()) {
  /** @private **/
  _adapter: IntlDefaultAdapter = getOwner(this).lookup('ember-intl@adapter:default');

  init() {
    super.init();

    const initialLocale = get(this as IntlService, 'locale') || ['en-us'];
    this.setLocale(initialLocale);

    warn(
      '[ember-intl] Intl API does not exist in this environment.  A polyfill of `Intl` is required.',
      Boolean(Intl),
      {
        id: 'ember-intl-undefined-intljs'
      }
    );

    const owner = getOwner(this);

    if (!this.formats) {
      this.formats = owner.resolveRegistration('formats:main') || {};
    }

    // adapter doesn't get set in constructor on ember <= 3.4
    if (!this._adapter) {
      this._adapter = owner.lookup('ember-intl@adapter:default');
    }

    hydrate(this, owner);
  }

  /** @public **/
  lookup(key: string, localeName?: LocaleName, options?: { resilient?: boolean } & MissingMessageOptions) {
    const localeNames = this.localeWithDefault(localeName);
    let translation;

    for (let i = 0; i < localeNames.length; i++) {
      translation = this._adapter.lookup(localeNames[i], key);

      if (translation !== undefined) {
        break;
      }
    }

    if (!(options && options.resilient) && translation === undefined) {
      const missingMessage: MissingMessage = getOwner(this).resolveRegistration('util:intl/missing-message');

      return missingMessage.call(this, key, localeNames, options);
    }

    return translation;
  }

  /** @public **/
  t(key: string, options?: { default?: string | string[]; locale?: LocaleName } & MissingMessageOptions) {
    let defaults = [key];
    let msg;

    if (options && options.default) {
      defaults = defaults.concat(options.default);
    }

    while (!msg && defaults.length) {
      msg = this.lookup(
        defaults.shift() as string,
        options && options.locale,
        assign({}, options as MissingMessageOptions, { resilient: defaults.length > 0 })
      );
    }

    /* Avoids passing msg to intl-messageformat if it is not a string */
    if (typeof msg === 'string') {
      return this.formatMessage(msg, options);
    }

    return msg;
  }

  /** @public **/
  exists(key: string, localeName?: LocaleName): boolean {
    const localeNames = this.localeWithDefault(localeName);
    assert(
      `[ember-intl] locale is unset, cannot lookup '${key}'`,
      Array.isArray(localeNames) && localeNames.length > 0
    );

    return localeNames.some(localeName => this._adapter.has(localeName, key));
  }

  /** @public */
  setLocale(locale: LocaleName) {
    set(this as IntlService, 'locale', locale);
  }

  /**
   * A utility method for registering CLDR data against
   * intl-messageformat and intl-relativeformat.
   *
   * @method addLocaleData
   * @param {Object} locale data
   * @public
   */
  addLocaleData(data: any) {
    IntlMessageFormat.__addLocaleData(data);
    IntlRelativeFormat.__addLocaleData(data);
  }

  /** @public **/
  addTranslations(localeName: string, payload: Translations) {
    const locale = this.translationsFor(localeName);

    locale.addTranslations(payload);
  }

  /** @public **/
  translationsFor(localeName: string) {
    return this._adapter.localeFactory(normalizeLocale(localeName));
  }

  /** @private **/
  getFormat(formatType: string, format: string): any | undefined {
    const formats = get(this, 'formats');

    if (formats && formatType && typeof format === 'string') {
      return get(formats, `${formatType}.${format}`);
    }
  }

  /** @private **/
  localeWithDefault(localeName?: LocaleName) {
    if (typeof localeName === 'string') {
      return makeArray(localeName).map(normalizeLocale);
    }

    if (Array.isArray(localeName)) {
      return localeName.map(normalizeLocale);
    }

    return this._locale || [];
  }

  /** @private **/
  updateDocumentLanguage(locales: string[]) {
    const dom = getDOM(this);

    if (dom) {
      const [primaryLocale] = locales;
      const html = dom.documentElement;
      html.setAttribute('lang', primaryLocale);
    }
  }
}

function formatter<T>(name: string) {
  return function(this: IntlService, value: T, options?: FormatterOptions, formats?: any): FormatResult {
    let formatOptions = options;

    if (options && typeof options.format === 'string') {
      formatOptions = assign({}, this.getFormat(name, options.format), options);
    }

    return this._formatters[name].format(value, formatOptions, {
      formats: formats || this.formats,
      locale: this.localeWithDefault(formatOptions && formatOptions.locale)
    });
  };
}

declare module '@ember/service' {
  interface Registry {
    intl: IntlService;
  }
}
