import { camelize } from '@ember/string';
import { warn } from '@ember/debug';
import { IntlMessageFormatOptions } from '@ember-intl/intl-messageformat';

import links from '../../utils/links';

const EMPTY_OBJECT = {};

export interface FormatterContext {
  locale: string[];
  formats: IntlMessageFormatOptions;
}

interface NativeFormatter<FormatOptions> {
  format(value: unknown, options?: FormatOptions): string;
}

export default interface Formatter<T, R, FormatOptions = void> {
  format(value: T, options?: FormatOptions, context?: FormatterContext): R;
}

export abstract class BaseFormatter<T, R, FormatterOptions, FormatOptions = void>
  implements Formatter<T, R, FormatOptions> {
  readonly options: (keyof FormatterOptions)[];

  constructor(options: string[] = []) {
    this.options = options as (keyof FormatterOptions)[];
  }

  abstract format(value: T, options?: FormatterOptions & FormatOptions, context?: FormatterContext): R;
  abstract createNativeFormatter(locales?: string[], options?: FormatterOptions): NativeFormatter<FormatOptions>;

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
      return EMPTY_OBJECT as FormatterOptions;
    }

    let found = {} as FormatterOptions;

    for (let key in options) {
      let normalized = camelize(key) as keyof FormatterOptions;

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
    formatterOptions?: FormatterOptions,
    formatOptions?: FormatOptions,
    ctx?: FormatterContext
  ): string {
    const locale = ctx && ctx.locale;
    if (!locale) {
      warn(`[ember-intl] no locale has been set. Documentation: ${links.unsetLocale}`, false, {
        id: 'ember-intl-no-locale-set'
      });
    }

    const formatter = this.createNativeFormatter(locale, formatterOptions);

    return formatter.format(value, formatOptions);
  }
}
