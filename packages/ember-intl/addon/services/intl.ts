import { getOwner } from '@ember/application';
import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';

import type { IntlShape, OnErrorFn } from '../-private/formatjs/index';
import { createIntl, createIntlCache } from '../-private/formatjs/index';
import { convertToString } from '../-private/utils/locale';

type OnFormatjsError = (error: Parameters<OnErrorFn>[0]) => void;

export default class IntlService extends Service {
  @tracked private _intls: Record<string, IntlShape> = {};
  @tracked private _locale?: string[];

  private _cache = createIntlCache();
  private _formats?: Record<string, unknown>;

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
  }

  willDestroy() {
    super.willDestroy();
  }

  private createIntl(
    locale: string | string[],
    messages: Record<string, unknown> = {},
  ) {
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
        onError: this.onFormatjsError,
      },
      this._cache,
    );
  }

  private getIntl(locale: string | string[]) {
    const resolvedLocale = convertToString(locale);

    return this._intls[resolvedLocale];
  }

  private updateIntl(
    locale: string | string[],
    messages?: Record<string, unknown>,
  ) {
    const resolvedLocale = convertToString(locale);
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

  private onFormatjsError(error: Parameters<OnFormatjsError>[0]): void {
    switch (error.code) {
      case 'MISSING_TRANSLATION': {
        // Do nothing
        break;
      }

      default: {
        throw error;
      }
    }
  }
}

// DO NOT DELETE: this is how TypeScript knows how to look up your services.
declare module '@ember/service' {
  interface Registry {
    intl: IntlService;
  }
}
