import { camelize } from '@ember/string';
import { warn } from '@ember/debug';

import links from '../../utils/links';

const EMPTY_OBJECT = {};

export interface FormatterOptions {
  [key: string]: any;
}

export interface FormatterContext {
  locale: string[];
  formats: any;
}

export type FormatResult = string | { toString(): string };

interface NativeFormatter {
  format(value: any, options?: object): FormatResult;
}

export default interface Formatter<T> {
  format(value: T, options: FormatterOptions | undefined, context: FormatterContext): FormatResult;
}

export abstract class BaseFormatter<T> implements Formatter<T> {
  readonly options: string[];

  constructor(options: string[] = []) {
    this.options = options;
  }

  abstract format(value: T, options: FormatterOptions, context: FormatterContext): FormatResult;
  abstract createNativeFormatter(locales: string[], options: FormatterOptions): NativeFormatter;

  /**
   * Filters out all of the whitelisted formatter options
   *
   * @method readOptions
   * @param {Object} Options object
   * @return {Object} Options object containing just whitelisted options
   * @private
   */
  readOptions(options?: FormatterOptions): FormatterOptions {
    if (!options) {
      return EMPTY_OBJECT;
    }

    let found: FormatterOptions = {};

    for (let key in options) {
      let normalized = camelize(key);

      if (this.options.indexOf(normalized) >= 0) {
        found[normalized] = options[key];
      }
    }

    return found;
  }

  /**
   * Invokes the Intl formatter methods
   *
   * @method _format
   * @param {value} Raw input value that needs formatting
   * @return {Object} Formatter options hash
   * @return {Object} Format options hash
   * @private
   */
  _format(
    value: T,
    formatterOptions: FormatterOptions,
    formatOptions: object | undefined,
    { locale }: FormatterContext
  ): FormatResult {
    if (!locale) {
      warn(`[ember-intl] no locale has been set. Documentation: ${links.unsetLocale}`, false, {
        id: 'ember-intl-no-locale-set'
      });
    }

    const formatter = this.createNativeFormatter(locale, formatterOptions);

    return formatter.format(value, formatOptions);
  }
}
