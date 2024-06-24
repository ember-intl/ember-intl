import { getOwner } from '@ember/application';
import { registerDestructor } from '@ember/destroyable';
import { cancel, next, type Timer as EmberRunTimer } from '@ember/runloop';
import Service from '@ember/service';
import { htmlSafe } from '@ember/template';
import { tracked } from '@glimmer/tracking';
import EventEmitter from 'eventemitter3';

import type {
  FormatDateParameters,
  FormatListParameters,
  FormatMessageParameters,
  FormatNumberParameters,
  FormatRelativeParameters,
  FormatTimeParameters,
  IntlShape,
  OnErrorFn,
} from '../-private/formatjs/index';
import {
  createIntl,
  createIntlCache,
  formatDate,
  formatList,
  formatMessage,
  formatNumber,
  formatRelative,
  formatTime,
} from '../-private/formatjs/index';
import { escapeFormatMessageOptions } from '../-private/utils/escape-format-message-options';
import { getDOM } from '../-private/utils/get-dom';
import {
  convertToArray,
  convertToString,
  hasLocaleChanged,
  normalizeLocale,
} from '../-private/utils/locale';
import { flattenKeys, type Translations } from '../-private/utils/translations';
import translations from '../translations';

type OnFormatjsError = (error: Parameters<OnErrorFn>[0]) => void;

type OnMissingTranslation = (
  key: string,
  locales: string[],
  options?: Record<string, unknown>,
) => string;

export default class IntlService extends Service {
  @tracked private _intls: Record<string, IntlShape> = {};
  @tracked private _locale?: string[];

  private _cache = createIntlCache();
  private _eventEmitter = new EventEmitter();
  private _formats?: Record<string, unknown>;
  private _timer?: EmberRunTimer;

  private _onFormatjsError: OnFormatjsError = (error) => {
    switch (error.code) {
      case 'MISSING_TRANSLATION': {
        // Do nothing
        break;
      }

      default: {
        throw error;
      }
    }
  };

  private _onMissingTranslation: OnMissingTranslation = (key, locales) => {
    const locale = locales.join(', ');

    return `Missing translation "${key}" for locale "${locale}"`;
  };

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

    // Hydrate
    translations.forEach(([locale, translations]: [string, Translations]) => {
      this.addTranslations(locale, translations);
    });
  }

  willDestroy() {
    super.willDestroy();

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore: Argument of type 'Timer | undefined' is not assignable to parameter of type 'EmberRunTimer | undefined'
    // eslint-disable-next-line ember/no-runloop
    cancel(this._timer);
  }

  addTranslations(locale: string, translations: Translations) {
    const messages = flattenKeys(translations);

    this.updateIntl(locale, messages);
  }

  exists(key: string, locale?: string | string[]): boolean {
    const locales = locale ? convertToArray(locale) : this._locale!;

    return locales.some((locale) => {
      return this.getTranslation(key, locale) !== undefined;
    });
  }

  formatDate(
    value: FormatDateParameters[0] | undefined | null,
    options?: FormatDateParameters[1] & {
      locale?: string;
    },
  ): string {
    if (value === undefined || value === null) {
      return '';
    }

    const intlShape = this.getIntlShape(options?.locale);

    return formatDate(intlShape, value, options);
  }

  formatList(
    value: FormatListParameters[0] | undefined | null,
    options?: FormatListParameters[1] & {
      locale?: string;
    },
  ): string {
    if (value === undefined || value === null) {
      return '';
    }

    const intlShape = this.getIntlShape(options?.locale);

    return formatList(intlShape, value, options);
  }

  formatMessage(
    value: FormatMessageParameters[0] | string | undefined | null,
    options?: FormatMessageParameters[1] & {
      htmlSafe?: boolean;
      locale?: string;
    },
  ): string {
    if (value === undefined || value === null) {
      return '';
    }

    const intlShape = this.getIntlShape(options?.locale);

    const descriptor =
      typeof value === 'object'
        ? value
        : {
            defaultMessage: value,
            description: undefined,
            id: value,
          };

    if (options?.htmlSafe) {
      const output = formatMessage(
        intlShape,
        descriptor,
        escapeFormatMessageOptions(options),
      );

      return htmlSafe(output) as unknown as string;
    }

    return formatMessage(intlShape, descriptor, options);
  }

  formatNumber(
    value: FormatNumberParameters[0] | undefined | null,
    options?: FormatNumberParameters[1] & {
      locale?: string;
    },
  ): string {
    if (value === undefined || value === null) {
      return '';
    }

    const intlShape = this.getIntlShape(options?.locale);

    return formatNumber(intlShape, value, options);
  }

  formatRelative(
    value: FormatRelativeParameters[0] | undefined | null,
    options?: FormatRelativeParameters[2] & {
      locale?: string;
      unit?: FormatRelativeParameters[1];
    },
  ): string {
    if (value === undefined || value === null) {
      return '';
    }

    const intlShape = this.getIntlShape(options?.locale);

    return formatRelative(intlShape, value, options?.unit, options);
  }

  formatTime(
    value: FormatTimeParameters[0] | undefined | null,
    options?: FormatTimeParameters[1] & {
      locale?: string;
    },
  ): string {
    if (value === undefined || value === null) {
      return '';
    }

    const intlShape = this.getIntlShape(options?.locale);

    return formatTime(intlShape, value, options);
  }

  getTranslation(key: string, locale: string): string | undefined {
    const messages = this.getIntl(locale)?.messages;

    if (!messages) {
      return;
    }

    return messages[key] as string | undefined;
  }

  setLocale(locale: string | string[]): void {
    const proposedLocale = convertToArray(locale);

    if (hasLocaleChanged(proposedLocale, this._locale)) {
      this._locale = proposedLocale;

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore: Argument of type 'Timer | undefined' is not assignable to parameter of type 'EmberRunTimer | undefined'
      // eslint-disable-next-line ember/no-runloop
      cancel(this._timer);

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore: Argument of type 'Timer | undefined' is not assignable to parameter of type 'EmberRunTimer | undefined'
      // eslint-disable-next-line ember/no-runloop
      this._timer = next(() => {
        this._eventEmitter.emit('localeChanged');

        this.updateDocumentLanguage();
      });
    }

    this.updateIntl(proposedLocale);
  }

  setOnFormatjsError(onFormatjsError: OnFormatjsError): void {
    this._onFormatjsError = onFormatjsError;

    // Call `updateIntl` to update `onError` for each locale
    this.locales.forEach((locale) => {
      this.updateIntl(locale, {});
    });
  }

  setOnMissingTranslation(onMissingTranslation: OnMissingTranslation): void {
    this._onMissingTranslation = onMissingTranslation;
  }

  t(
    key: string,
    options?: FormatMessageParameters[1] & {
      htmlSafe?: boolean;
      locale?: string;
    },
  ): string {
    const locales = options?.locale ? [options.locale] : this._locale!;
    let translation: string | undefined;

    for (const locale of locales) {
      translation = this.getTranslation(key, locale);

      if (translation !== undefined) {
        break;
      }
    }

    if (translation === undefined) {
      return this._onMissingTranslation(key, this._locale!, options);
    }

    // Bypass @formatjs/intl
    if (translation === '') {
      return '';
    }

    return this.formatMessage(
      {
        defaultMessage: translation,
        id: key,
      },
      options,
    );
  }

  private createIntl(
    locale: string | string[],
    messages: Record<string, unknown> = {},
  ): IntlShape {
    const resolvedLocale = convertToString(locale);
    const formats = this._formats;

    return createIntl(
      {
        defaultFormats: formats,
        defaultLocale: resolvedLocale,
        formats,
        locale: resolvedLocale,
        // @ts-expect-error: Type 'Record<string, unknown>' is not assignable
        messages,
        onError: this._onFormatjsError,
      },
      this._cache,
    );
  }

  private getIntl(locale: string | string[]): IntlShape | undefined {
    const resolvedLocale = normalizeLocale(convertToString(locale));

    return this._intls[resolvedLocale];
  }

  private getIntlShape(locale?: string): IntlShape {
    if (locale) {
      return this.createIntl(locale);
    }

    return this.getIntl(this._locale!)!;
  }

  private onLocaleChanged(fn: any, context: any): void {
    this._eventEmitter.on('localeChanged', fn, context);

    registerDestructor(context, () => {
      this._eventEmitter.off('localeChanged', fn, context);
    });
  }

  private updateDocumentLanguage(): void {
    const dom = getDOM(this);

    if (dom) {
      const html = dom.documentElement;

      html.setAttribute('lang', this.primaryLocale);
    }
  }

  private updateIntl(
    locale: string | string[],
    messages?: Record<string, unknown>,
  ): void {
    const resolvedLocale = normalizeLocale(convertToString(locale));
    const intl = this._intls[resolvedLocale];

    let newIntl;

    if (!intl) {
      newIntl = this.createIntl(resolvedLocale, messages);
    } else if (messages) {
      newIntl = this.createIntl(resolvedLocale, {
        ...(intl.messages ?? {}),
        ...messages,
      });
    }

    if (!newIntl) {
      return;
    }

    this._intls = {
      ...this._intls,
      [resolvedLocale]: newIntl,
    };
  }
}

// DO NOT DELETE: this is how TypeScript knows how to look up your services.
declare module '@ember/service' {
  interface Registry {
    intl: IntlService;
  }
}
