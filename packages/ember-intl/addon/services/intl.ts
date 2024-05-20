import { getOwner } from '@ember/application';
import { registerDestructor } from '@ember/destroyable';
import { cancel, next, type Timer as EmberRunTimer } from '@ember/runloop';
import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';
import EventEmitter from 'eventemitter3';

import type { IntlShape, OnErrorFn } from '../-private/formatjs/index';
import { createIntl, createIntlCache } from '../-private/formatjs/index';
import { getDOM } from '../-private/utils/get-dom';
import {
  convertToArray,
  convertToString,
  hasLocaleChanged,
} from '../-private/utils/locale';

type OnFormatjsError = (error: Parameters<OnErrorFn>[0]) => void;

export default class IntlService extends Service {
  @tracked private _intls: Record<string, IntlShape> = {};
  @tracked private _locale?: string[];

  private _cache = createIntlCache();
  private _eventEmitter = new EventEmitter();
  private _formats?: Record<string, unknown>;
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
  }

  willDestroy() {
    super.willDestroy();

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore: Argument of type 'Timer | undefined' is not assignable to parameter of type 'EmberRunTimer | undefined'
    // eslint-disable-next-line ember/no-runloop
    cancel(this._timer);
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

    this.updateIntl(locale);
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

  private onLocaleChanged(fn: any, context: any) {
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
}

// DO NOT DELETE: this is how TypeScript knows how to look up your services.
declare module '@ember/service' {
  interface Registry {
    intl: IntlService;
  }
}
