/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

import IntlRelativeFormat, { IntlRelativeFormatOptions } from '@ember-intl/intl-relativeformat';
import IntlMessageFormat, { IntlMessageFormatOptions } from '@ember-intl/intl-messageformat';
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
import {
  FormatDate,
  FormatDateOptions,
  FormatMessage,
  FormatMessageOptions,
  FormatNumber,
  FormatNumberOptions,
  FormatRelative,
  FormatRelativeOptions,
  FormatTime,
  FormatTimeOptions
} from '../-private/formatters';
import { Dateish } from '../-private/formatters/format-date';
import isArrayEqual from '../-private/is-array-equal';
import normalizeLocale from '../-private/normalize-locale';
import hydrate from '../hydrate';
import getDOM from '../utils/get-dom';
import { MissingMessage, MissingMessageOptions } from '../utils/missing-message';
import { Translations } from '../models/translation';

type Locale = string[] | null;
type LocaleName = string | string[];

interface Formats extends IntlMessageFormatOptions {
  relative?: {
    [style: string]: IntlRelativeFormatOptions;
  };
}

interface FormatOptionDecoration {
  format?: string;
  locale?: LocaleName;
}

export type formatRelativeOptions = FormatRelativeOptions & FormatOptionDecoration;
export type formatMessageOptions = FormatMessageOptions & { locale?: LocaleName };
export type formatNumberOptions = FormatNumberOptions & FormatOptionDecoration;
export type formatTimeOptions = FormatTimeOptions & FormatOptionDecoration;
export type formatDateOptions = FormatDateOptions & FormatOptionDecoration;
export type tOptions = formatMessageOptions & { default?: string | string[] } & MissingMessageOptions;

class OverridableProps {
  /** @private **/
  _locale: Locale = null;

  /** @private **/
  _adapter: any = null;

  /** @private **/
  _timer?: EmberRunTimer;

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
  /** @public **/
  formats: Formats = getOwner(this).resolveRegistration('formats:main') || {};

  /** @private **/
  _adapter: IntlDefaultAdapter = getOwner(this).lookup('ember-intl@adapter:default');

  /** @private **/
  _formatters = {
    message: new FormatMessage(),
    relative: new FormatRelative(),
    number: new FormatNumber(),
    time: new FormatTime(),
    date: new FormatDate()
  };

  /** @public **/
  formatRelative(value: Dateish, options?: formatRelativeOptions) {
    let opts = options;

    if (options && typeof options.format === 'string' && this.formats && this.formats.relative) {
      opts = assign({}, this.formats.relative[options.format], options);
    }

    return this._formatters.relative.format(value, opts, {
      formats: this.formats,
      locale: this.localeWithDefault(opts && opts.locale)
    });
  }

  /** @public **/
  formatMessage(value: string, options?: formatMessageOptions, formats?: IntlMessageFormatOptions) {
    return this._formatters.message.format(value, options, {
      formats: formats || this.formats,
      locale: this.localeWithDefault(options && options.locale)
    });
  }

  /** @public **/
  formatNumber(value: number, options?: formatNumberOptions) {
    let opts = options;

    if (options && typeof options.format === 'string' && this.formats && this.formats.number) {
      opts = assign({}, this.formats.number[options.format], options);
    }

    return this._formatters.number.format(value, opts, {
      formats: this.formats,
      locale: this.localeWithDefault(opts && opts.locale)
    });
  }

  /** @public **/
  formatTime(value: Dateish, options?: formatTimeOptions) {
    let opts = options;

    if (options && typeof options.format === 'string' && this.formats && this.formats.time) {
      opts = assign({}, this.formats.time[options.format], options);
    }

    return this._formatters.time.format(value, opts, {
      formats: this.formats,
      locale: this.localeWithDefault(opts && opts.locale)
    });
  }

  /** @public **/
  formatDate(value: Dateish, options?: formatDateOptions) {
    let opts = options;

    if (options && typeof options.format === 'string' && this.formats && this.formats.date) {
      opts = assign({}, this.formats.date[options.format], options);
    }

    return this._formatters.date.format(value, opts, {
      formats: this.formats,
      locale: this.localeWithDefault(opts && opts.locale)
    });
  }

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

    // formats doesn't get set in constructor on ember <= 3.4
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

    for (let i = 0; i < localeNames.length; i++) {
      const translation = this._adapter.lookup(localeNames[i], key);

      if (translation !== undefined) {
        return translation;
      }
    }

    if (!(options && options.resilient)) {
      const missingMessage: MissingMessage = getOwner(this).resolveRegistration('util:intl/missing-message');

      return missingMessage.call(this, key, localeNames, options);
    }
  }

  /** @public **/
  t(key: string, options?: tOptions) {
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

declare module '@ember/service' {
  interface Registry {
    intl: IntlService;
  }
}
