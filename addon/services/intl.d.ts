import { EmberRunTimer } from '@ember/runloop/types';
import Service from '@ember/service';
import type { SafeString } from '@ember/template/-private/handlebars';
import FormatList from 'ember-intl/-private/formatters/format-list';

import {
  FormatDate,
  FormatMessage,
  FormatNumber,
  FormatRelative,
  FormatTime,
} from '../-private/formatters';

export interface TOptions {
  [option: string]: unknown;
  default?: string | string[];
  htmlSafe?: boolean;
  locale?: string | string[];
}

type FormatterProxy<T extends keyof IntlService['_formatters']> = (
  value: Parameters<IntlService['_formatters'][T]['format']>[1],
  formatOptions?: Parameters<IntlService['_formatters'][T]['format']>[2] & {
    locale?: string | [string, ...string[]];
  },
) => ReturnType<IntlService['_formatters'][T]['format']>;

/**
 * By default `utils/intl/missing-message` always returns a string. Users could
 * change this. This type is to indicate that some methods just pass through the
 * return value of that function.
 */
type MissingMessage = string;

export default class IntlService extends Service {
  /**
   * Returns an array of registered locale names
   *
   */
  readonly locales: string[];

  locale: string | [string, ...string[]];

  /**
   * Returns the first locale of the currently active locales
   *
   */
  readonly primaryLocale: string;

  readonly formatRelative: FormatterProxy<'relative'>;
  readonly formatNumber: FormatterProxy<'number'>;
  readonly formatTime: FormatterProxy<'time'>;
  readonly formatDate: FormatterProxy<'date'>;
  readonly formatList: FormatterProxy<'list'>;

  // ! This _should_ just be the type shown below, but because TypeScript
  // garbles up function overloads in generics, we need to manually enumerate
  // and duplicate the types here.
  // readonly formatMessage: FormatterProxy<'message'>;
  formatMessage(
    maybeAst: string,
    options?: Partial<Record<string, unknown>> & {
      htmlSafe?: false;
      locale?: string | [string, ...string[]];
    },
  ): string;
  formatMessage(
    maybeAst: string,
    options: Partial<Record<string, unknown>> & {
      htmlSafe: true;
      locale?: string | [string, ...string[]];
    },
  ): SafeString;
  formatMessage(
    maybeAst: string,
    options?: Partial<Record<string, unknown>> & {
      htmlSafe?: boolean;
      locale?: string | [string, ...string[]];
    },
  ): string | SafeString;

  private _locale: string[];

  private _timer?: EmberRunTimer;

  private _formatters: ReturnType<IntlService['_createFormatters']>;

  private _owner: unknown;

  private onError(info: { error: unknown; kind: unknown }): never;

  lookup(
    key: string,
    localeName?: string | string[],
    opts?: { resilient?: boolean },
  ): string | undefined;

  private validateKeys(keys: string[]): void;
  private validateKeys(keys: unknown[]): void | never;

  t(
    key: string,
    options?: TOptions & { htmlSafe?: false },
  ): string | MissingMessage;
  t(
    key: string,
    options: TOptions & { htmlSafe: true },
  ): SafeString | MissingMessage;
  t(key: string, options?: TOptions): string | SafeString | MissingMessage;

  exists(key: string, localeName?: string | string[]): boolean;

  setLocale(localeName: string | string[]): void;

  addTranslations(localeName: string, payload: unknown): void;

  translationsFor(localeName: string): Record<string, string>;

  private _localeWithDefault(localeName?: string | string[]): string[];

  private _updateDocumentLanguage(locales: string[]): void;

  private _createFormatters(): {
    date: FormatDate;
    list: FormatList;
    message: FormatMessage;
    number: FormatNumber;
    relative: FormatRelative;
    time: FormatTime;
  };
}
