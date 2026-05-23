import { cancel, next, type Timer as EmberRunTimer } from '@ember/runloop';
import Service from '@ember/service';
import { htmlSafe } from '@ember/template';
import { tracked } from '@glimmer/tracking';

import type {
  FormatDateParameters,
  FormatDateRangeParameters,
  FormatDisplayNameParameters,
  FormatListParameters,
  FormatMessageParameters,
  FormatNumberParameters,
  FormatRelativeTimeParameters,
  Formats,
  FormatTimeParameters,
  IntlShape,
  OnErrorFn,
} from '../-private/formatjs/index.ts';
import {
  convertToFormatjsFormats,
  createIntl,
  createIntlCache,
  formatDate,
  formatDateRange,
  formatDisplayName,
  formatList,
  formatMessage,
  formatNumber,
  formatRelativeTime,
  formatTime,
} from '../-private/formatjs/index.ts';
import { escapeFormatMessageOptions } from '../-private/utils/escape-format-message-options.ts';
import { getHtmlElement } from '../-private/utils/get-html-element.ts';
import {
  convertToArray,
  convertToString,
  hasLocaleChanged,
  normalizeLocale,
} from '../-private/utils/locale.ts';
import {
  flattenKeys,
  type TranslationJson,
} from '../-private/utils/translations.ts';

type FormatDateArg = FormatDateParameters[0] | undefined | null;
type FormatDateOptions = FormatDateParameters[1] & {
  locale?: string;
};

type FormatDateRangeFrom = FormatDateRangeParameters[0] | undefined | null;
type FormatDateRangeTo = FormatDateRangeParameters[1] | undefined | null;
type FormatDateRangeOptions = FormatDateRangeParameters[2] & {
  locale?: string;
};

type FormatDisplayNameArg = FormatDisplayNameParameters[0] | undefined | null;
type FormatDisplayNameOptions = FormatDisplayNameParameters[1] & {
  locale?: string;
};

type FormatListArg = FormatListParameters[0] | undefined | null;
type FormatListOptions = FormatListParameters[1] & {
  locale?: string;
};

type FormatMessageArg = FormatMessageParameters[0] | string | undefined | null;
type FormatMessageOptions = FormatMessageParameters[1] & {
  htmlSafe?: boolean;
  locale?: string;
};

type FormatNumberArg = FormatNumberParameters[0] | undefined | null;
type FormatNumberOptions = FormatNumberParameters[1] & {
  locale?: string;
};

type FormatRelativeTimeArg = FormatRelativeTimeParameters[0] | undefined | null;
type FormatRelativeTimeOptions = FormatRelativeTimeParameters[2] & {
  locale?: string;
  unit?: FormatRelativeTimeParameters[1];
};

type FormatTimeArg = FormatTimeParameters[0] | undefined | null;
type FormatTimeOptions = FormatTimeParameters[1] & {
  locale?: string;
};

type OnFormatjsError = (error: Parameters<OnErrorFn>[0]) => void;

type OnMissingTranslation = (
  key: string,
  locales: string[],
  data?: Record<string, unknown>,
) => string;

export type {
  FormatDateArg,
  FormatDateOptions,
  FormatDateRangeFrom,
  FormatDateRangeOptions,
  FormatDateRangeTo,
  FormatDisplayNameArg,
  FormatDisplayNameOptions,
  FormatListArg,
  FormatListOptions,
  FormatMessageArg,
  FormatMessageOptions,
  FormatNumberArg,
  FormatNumberOptions,
  FormatRelativeTimeArg,
  FormatRelativeTimeOptions,
  FormatTimeArg,
  FormatTimeOptions,
  Formats,
  OnFormatjsError,
  OnMissingTranslation,
  TranslationJson,
};

export default class IntlService extends Service {
  @tracked private _intls: Record<string, IntlShape> = {};
  @tracked private _locale?: string[];

  private _cache = createIntlCache();
  private _formats: Formats = {};
  private _onFormatjsError: OnFormatjsError = (error) => {
    switch (error.code) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-enum-comparison
      case 'MISSING_DATA': {
        console.warn(error.message);
        break;
      }

      // eslint-disable-next-line @typescript-eslint/no-unsafe-enum-comparison
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

  addTranslations(locale: string, translations: TranslationJson): void {
    const messages = flattenKeys(translations);

    this.updateIntl(locale, messages);
  }

  private createIntl(
    locale: string | string[],
    messages: Record<string, unknown> = {},
  ): IntlShape {
    const resolvedLocale = convertToString(locale);
    const formats = convertToFormatjsFormats(this._formats);

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

  exists(key: string, locale?: string | string[]): boolean {
    const locales = locale ? convertToArray(locale) : this._locale!;

    return locales.some((locale) => {
      return this.getTranslation(key, locale) !== undefined;
    });
  }

  formatDate(value: FormatDateArg, options?: FormatDateOptions): string {
    if (value === undefined || value === null) {
      return '';
    }

    const intlShape = this.getIntlShape(options?.locale);

    return formatDate(intlShape, value, options);
  }

  formatDateRange(
    from: FormatDateRangeFrom,
    to: FormatDateRangeTo,
    options?: FormatDateRangeOptions,
  ): string {
    if (from === undefined || from === null) {
      return '';
    }

    if (to === undefined || to === null) {
      return '';
    }

    const intlShape = this.getIntlShape(options?.locale);

    return formatDateRange(intlShape, from, to, options);
  }

  formatDisplayName(
    value: FormatDisplayNameArg,
    options: FormatDisplayNameOptions,
  ): string {
    if (value === undefined || value === null) {
      return '';
    }

    const intlShape = this.getIntlShape(options?.locale);

    return formatDisplayName(intlShape, value, options);
  }

  formatList(value: FormatListArg, options?: FormatListOptions): string {
    if (value === undefined || value === null) {
      return '';
    }

    const intlShape = this.getIntlShape(options?.locale);

    return formatList(intlShape, value, options);
  }

  formatMessage(
    value: FormatMessageArg,
    options?: FormatMessageOptions,
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

  formatNumber(value: FormatNumberArg, options?: FormatNumberOptions): string {
    if (value === undefined || value === null) {
      return '';
    }

    const intlShape = this.getIntlShape(options?.locale);

    return formatNumber(intlShape, value, options);
  }

  formatRelativeTime(
    value: FormatRelativeTimeArg,
    options?: FormatRelativeTimeOptions,
  ): string {
    if (value === undefined || value === null) {
      return '';
    }

    const intlShape = this.getIntlShape(options?.locale);

    return formatRelativeTime(intlShape, value, options?.unit, options);
  }

  formatTime(value: FormatTimeArg, options?: FormatTimeOptions): string {
    if (value === undefined || value === null) {
      return '';
    }

    const intlShape = this.getIntlShape(options?.locale);

    return formatTime(intlShape, value, options);
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

  getTranslation(key: string, locale: string): string | undefined {
    const messages = this.getIntl(locale)?.messages;

    if (!messages) {
      return;
    }

    return messages[key] as string | undefined;
  }

  setFormats(formats: Formats): void {
    this._formats = formats;

    // Call `updateIntl` to update `formats` for each locale
    this.locales.forEach((locale) => {
      this.updateIntl(locale, {});
    });
  }

  setLocale(locale: string | string[]): void {
    const proposedLocale = convertToArray(locale);

    if (hasLocaleChanged(proposedLocale, this._locale)) {
      this._locale = proposedLocale;

      // eslint-disable-next-line ember/no-runloop
      cancel(this._timer);

      // eslint-disable-next-line ember/no-runloop
      this._timer = next(() => {
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

  t(key: string, options?: FormatMessageOptions): string {
    const locales = options?.locale ? [options.locale] : this._locale!;
    let translation: string | undefined;

    for (const locale of locales) {
      translation = this.getTranslation(key, locale);

      if (translation !== undefined) {
        break;
      }
    }

    if (translation === undefined) {
      return this._onMissingTranslation(key, locales, options);
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

  private updateDocumentLanguage(): void {
    const html = getHtmlElement(this);
    const { primaryLocale } = this;

    if (!html || !primaryLocale) {
      return;
    }

    html.setAttribute('lang', primaryLocale);
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

  willDestroy(): void {
    super.willDestroy();

    // eslint-disable-next-line ember/no-runloop
    cancel(this._timer);
  }
}

// DO NOT DELETE: this is how TypeScript knows how to look up your services.
declare module '@ember/service' {
  interface Registry {
    intl: IntlService;
  }
}
