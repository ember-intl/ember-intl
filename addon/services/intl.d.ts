import Evented from '@ember/object/evented';
import Service from '@ember/service';
import { EmberRunTimer } from '@ember/runloop/types';
import type { SafeString } from '@ember/template/-private/handlebars';

import { FormatDate, FormatMessage, FormatNumber, FormatRelative, FormatTime } from '../-private/formatters';
import TranslationContainer from '../-private/store/container';
import { Formats } from '../types';
import { MessageFormatElement } from 'intl-messageformat-parser';

export interface TOptions {
  default?: string | string[];
  locale?: string | string[];
  htmlSafe?: boolean;
  [option: string]: unknown;
}

type FormatterProxy<T extends keyof IntlService['_formatters']> = (
  value: Parameters<IntlService['_formatters'][T]['format']>[1],
  formatOptions: Parameters<IntlService['_formatters'][T]['format']>[2]
) => ReturnType<IntlService['_formatters'][T]['format']>;

/**
 * By default `utils/intl/missing-message` always returns a string. Users could
 * change this. This type is to indicate that some methods just pass through the
 * return value of that function.
 */
type MissingMessage = string;

export default class IntlService extends Service.extend(Evented) {
  /**
   * @public
   */
  readonly formats: Formats;

  /**
   * Returns an array of registered locale names
   *
   * @property locales
   * @public
   */
  readonly locales: string[];

  locale: string | [string, ...string[]];

  /**
   * Returns the first locale of the currently active locales
   *
   * @property primaryLocale
   * @public
   */
  readonly primaryLocale: string;

  readonly formatRelative: FormatterProxy<'relative'>;
  readonly formatMessage: FormatterProxy<'message'>;
  readonly formatNumber: FormatterProxy<'number'>;
  readonly formatTime: FormatterProxy<'time'>;
  readonly formatDate: FormatterProxy<'date'>;

  private _translationContainer?: TranslationContainer;

  private _locale: string[];

  private _timer?: EmberRunTimer;

  private _formatters: ReturnType<IntlService['_createFormatters']>;

  private _owner: unknown;

  private onError(info: { kind: unknown; error: unknown }): never;

  lookup(key: string, localeName?: string | string[]): string | undefined;

  lookupAst(
    key: string,
    localeName?: string | string[],
    options?: { resilient: boolean }
  ): MessageFormatElement[] | MissingMessage;

  private validateKeys(keys: string[]): void;
  private validateKeys(keys: unknown[]): void | never;

  t(key: string, options?: TOptions & { htmlSafe?: false }): string | MissingMessage;
  t(key: string, options?: TOptions & { htmlSafe: true }): SafeString | MissingMessage;
  t(key: string, options?: TOptions): string | SafeString | MissingMessage;

  exists(key: string, localeName?: string | string[]): boolean;

  setLocale(localeName: string | string[]): void;

  addTranslations(localeName: string, payload: unknown): void;

  translationsFor(localeName: string): unknown;

  private _localeWithDefault(localeName?: string | string[]): string[];

  private _updateDocumentLanguage(locales: string[]): void;

  private _createFormatters(): {
    message: FormatMessage;
    relative: FormatRelative;
    number: FormatNumber;
    time: FormatTime;
    date: FormatDate;
  };
}
