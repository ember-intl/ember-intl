import { cancel, next, type Timer as EmberRunTimer } from '@ember/runloop';
import Service from '@ember/service';
import { htmlSafe } from '@ember/template';
import { tracked } from '@glimmer/tracking';

import type {
  FormatDateParameters,
  FormatDateRangeParameters,
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
  formatList,
  formatMessage,
  formatNumber,
  formatRelativeTime,
  formatTime,
} from '../-private/formatjs/index.ts';
import { escapeFormatMessageOptions } from '../-private/utils/escape-format-message-options.ts';
import { getDOM } from '../-private/utils/get-dom.ts';
import {
  convertToArray,
  convertToString,
  hasLocaleChanged,
  normalizeLocale,
} from '../-private/utils/locale.ts';
import {
  flattenKeys,
  type Translations,
} from '../-private/utils/translations.ts';

export type { Formats };

type OnFormatjsError = (error: Parameters<OnErrorFn>[0]) => void;

type OnMissingTranslation = (
  key: string,
  locales: string[],
  data?: Record<string, unknown>,
) => string;

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

  addTranslations(locale: string, translations: Translations) {
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

  formatDateRange(
    from: FormatDateRangeParameters[0] | undefined | null,
    to: FormatDateRangeParameters[1] | undefined | null,
    options?: FormatDateRangeParameters[2] & {
      locale?: string;
    },
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

  formatRelativeTime(
    value: FormatRelativeTimeParameters[0] | undefined | null,
    options?: FormatRelativeTimeParameters[2] & {
      locale?: string;
      unit?: FormatRelativeTimeParameters[1];
    },
  ): string {
    if (value === undefined || value === null) {
      return '';
    }

    const intlShape = this.getIntlShape(options?.locale);

    return formatRelativeTime(intlShape, value, options?.unit, options);
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
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const dom = getDOM(this);

    if (dom) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
      const html = dom.documentElement;

      // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
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

  willDestroy() {
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
