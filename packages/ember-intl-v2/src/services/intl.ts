import { getOwner } from '@ember/application';
import { assert } from '@ember/debug';
import { registerDestructor } from '@ember/destroyable';
import { cancel, next } from '@ember/runloop';
import type { EmberRunTimer } from '@ember/runloop/types';
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
} from '../-private/formatters/index.ts';
import {
  createIntl,
  createIntlCache,
  onFormatjsIntlError,
} from '../-private/utils/formatjs.ts';
import getDOM from '../-private/utils/get-dom.ts';
import hydrate from '../-private/utils/hydrate.ts';
import {
  convertToArray,
  convertToString,
  hasLocaleChanged,
} from '../-private/utils/locale.ts';
import {
  flattenKeys,
  type Translations,
} from '../-private/utils/translations.ts';

type Formatters = IntlService['_formatters'];

type FormatterProxy<T extends keyof Formatters> = (
  value: Parameters<Formatters[T]['format']>[1],
  formatOptions?: Parameters<Formatters[T]['format']>[2] & {
    locale?: string | string[];
  },
) => ReturnType<Formatters[T]['format']>;

export interface TOptions {
  [option: string]: unknown;
  default?: string | string[];
  htmlSafe?: boolean;
  locale?: string | string[];
}

export default class IntlService extends Service {
  @tracked private _intls: Record<string, unknown> = {};

  @tracked private _locale?: string[];

  private _cache = createIntlCache();
  private _eventEmitter = new EventEmitter();
  private _formats?: Record<string, unknown>;
  private _formatters = {
    message: new FormatMessage(),
    relative: new FormatRelative(),
    number: new FormatNumber(),
    time: new FormatTime(),
    date: new FormatDate(),
    list: new FormatList(),
  };
  private _timer?: EmberRunTimer;

  get locales(): string[] {
    return Object.keys(this._intls);
  }

  get primaryLocale(): string | undefined {
    if (!this._locale) {
      return;
    }

    return this._locale[0];
  }

  constructor() {
    // eslint-disable-next-line prefer-rest-params
    super(...arguments);

    if (!this._formats) {
      // @ts-expect-error: Property 'resolveRegistration' does not exist on type 'Owner'
      this._formats = getOwner(this).resolveRegistration('formats:main') ?? {};
    }

    this.getIntl = this.getIntl.bind(this);
    this.getOrCreateIntl = this.getOrCreateIntl.bind(this);

    hydrate(this);
  }

  willDestroy() {
    super.willDestroy();

    // eslint-disable-next-line ember/no-runloop
    cancel(this._timer);
  }

  addTranslations(locale: string, translations: Translations) {
    const messages = flattenKeys(translations);

    this.getOrCreateIntl(locale, messages);
  }

  exists(key: string, localeName?: string | string[]): boolean {
    const localeNames = this.localeWithDefault(localeName);

    assert(
      `[ember-intl] locale is unset, cannot lookup '${key}'`,
      Array.isArray(localeNames) && localeNames.length,
    );

    return localeNames.some(
      (localeName) => key in (this.getIntl(localeName)?.messages || {}),
    );
  }

  readonly formatDate = createFormatterProxy('date') as FormatterProxy<'date'>;

  readonly formatList = createFormatterProxy('list') as FormatterProxy<'list'>;

  readonly formatMessage = createFormatterProxy(
    'message',
  ) as FormatterProxy<'message'>;

  readonly formatNumber = createFormatterProxy(
    'number',
  ) as FormatterProxy<'number'>;

  readonly formatRelative = createFormatterProxy(
    'relative',
  ) as FormatterProxy<'relative'>;

  readonly formatTime = createFormatterProxy('time') as FormatterProxy<'time'>;

  lookup(
    key: string,
    localeName?: string | string[],
    options: { resilient?: boolean } | undefined = {},
  ): string | undefined {
    const localeNames = this.localeWithDefault(localeName);
    let translation;

    for (let i = 0; i < localeNames.length; i++) {
      const messages = this.translationsFor(localeNames[i]!);

      if (!messages) {
        continue;
      }

      translation = messages[key];

      if (translation !== undefined) {
        break;
      }
    }

    if (translation === undefined && options.resilient !== true) {
      // @ts-expect-error: Property 'resolveRegistration' does not exist on type 'Owner'
      const missingMessage = getOwner(this).resolveRegistration(
        'util:intl/missing-message',
      );

      return missingMessage.call(this, key, localeNames, options);
    }

    return translation;
  }

  setLocale(locale: string | string[]): void {
    assert(
      `[ember-intl] No locale has been set. See https://ember-intl.github.io/ember-intl/docs/quickstart#4-configure-project`,
      locale,
    );

    const proposedLocale = convertToArray(locale);

    if (hasLocaleChanged(proposedLocale, this._locale)) {
      this._locale = proposedLocale;

      // eslint-disable-next-line ember/no-runloop
      cancel(this._timer);

      // eslint-disable-next-line ember/no-runloop
      this._timer = next(() => {
        this._eventEmitter.emit('localeChanged');
        this.updateDocumentLanguage(this._locale);
      });
    }

    this.getOrCreateIntl(locale);
  }

  t(
    key: string,
    options?: TOptions & { htmlSafe?: boolean } = {},
  ): string | undefined {
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

  translationsFor(locale: string): Record<string, string> {
    return this.getIntl(locale)?.messages;
  }

  private createIntl(locale: string | string[], messages: Record<string, unknown> = {}) {
    const { _formats: formats } = this;
    const resolvedLocale = convertToString(locale);

    return createIntl(
      {
        defaultFormats: formats,
        defaultLocale: resolvedLocale,
        formats,
        locale: resolvedLocale,
        // @ts-expect-error: Type 'Record<string, unknown>' is not assignable
        messages,
        onError: onFormatjsIntlError,
      },
      this._cache,
    );
  }

  private getIntl(locale: string | string[]) {
    const resolvedLocale = convertToString(locale);

    return this._intls[resolvedLocale];
  }

  private getOrCreateIntl(locale: string | string[], messages?: ) {
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

  private localeWithDefault(locale?: string | string[]): string[] {
    if (!locale) {
      return this._locale || [];
    }

    return convertToArray(locale);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private onLocaleChanged(fn: any, context: any) {
    this._eventEmitter.on('localeChanged', fn, context);

    registerDestructor(context, () => {
      this._eventEmitter.off('localeChanged', fn, context);
    });
  }

  private updateDocumentLanguage(locales: [string]): void {
    const dom = getDOM(this);

    if (dom) {
      const [primaryLocale] = locales;
      const html = dom.documentElement;
      html.setAttribute('lang', primaryLocale);
    }
  }
}

function createFormatterProxy(name) {
  return function serviceFormatterProxy(value, formatOptions) {
    let locale;
    let intl;
    if (formatOptions && formatOptions.locale) {
      locale = this.localeWithDefault(formatOptions.locale);
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

// DO NOT DELETE: this is how TypeScript knows how to look up your services.
declare module '@ember/service' {
  interface Registry {
    intl: IntlService;
  }
}
