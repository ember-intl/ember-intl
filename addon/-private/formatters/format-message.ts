/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

import Ember from 'ember';
import memoize from 'fast-memoize';
import { htmlSafe, isHTMLSafe } from '@ember/template';
import type { SafeString } from '@ember/template/-private/handlebars';
import IntlMessageFormat from 'intl-messageformat';
import type { Formats } from '../../types';
import parse from '../utils/parse';
import type { FormatterConfig } from './-base';
import type { TranslationAST } from '../store/translation';

const {
  Handlebars: {
    // @ts-expect-error Upstream types are incomplete.
    Utils: { escapeExpression },
  },
} = Ember;

function escapeOptions<T extends Record<string, unknown>>(object?: T) {
  if (typeof object !== 'object') {
    return;
  }

  const escapedOpts = {} as { [K in keyof T]: T[K] extends SafeString ? string : T[K] };

  (Object.keys(object) as (keyof T)[]).forEach((key) => {
    const val = object[key];

    if (isHTMLSafe(val)) {
      // If the option is an instance of Ember SafeString,
      // we don't want to pass it into the formatter, since the
      // formatter won't know what to do with it. Instead, we cast
      // the SafeString to a regular string using `toHTML`.
      // Since it was already marked as safe we should *not* escape it.
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      escapedOpts[key] = val.toHTML();
    } else if (typeof val === 'string') {
      escapedOpts[key] = escapeExpression(val);
    } else {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      escapedOpts[key] = val; // copy as-is
    }
  });

  return escapedOpts;
}

/**
 * @private
 * @hide
 */
export default class FormatMessage {
  static readonly type = 'message';

  protected readonly config: FormatterConfig;
  protected readonly readFormatConfig: () => Formats;

  constructor(config: FormatterConfig) {
    this.config = config;

    // NOTE: a fn since we lazily grab the formatter from the config
    // as it can change at runtime by calling intl.set('formats', {...});
    this.readFormatConfig = config.readFormatConfig;
  }

  createNativeFormatter = memoize(
    (ast: TranslationAST, locales: string | string[], formatConfig?: Partial<Formats>) => {
      return new IntlMessageFormat(ast, locales, formatConfig, {
        ignoreTag: true,
      });
    }
  );

  // ! Function overloads are not passed through generic types for reasons that
  // evade my knowledge. ¯\_(ツ)_/¯
  // For this reason these types need to be manually copied over to the
  // `IntlService#formatMessage`.
  format(
    locale: string | string[],
    maybeAst: string | TranslationAST,
    options?: Partial<Record<string, unknown>> & { htmlSafe?: false }
  ): string;
  format(
    locale: string | string[],
    maybeAst: string | TranslationAST,
    options: Partial<Record<string, unknown>> & { htmlSafe: true }
  ): SafeString;
  format(
    locale: string | string[],
    maybeAst: string | TranslationAST,
    options?: Partial<Record<string, unknown>> & { htmlSafe?: boolean }
  ): string | SafeString {
    let ast = maybeAst as TranslationAST;

    if (typeof maybeAst === 'string') {
      // maybe memoize?  it's not a typical hot path since we
      // parse when translations are pushed to ember-intl.
      // This is only used if inlining a translation i.e.,
      // {{format-message "Hi {name}"}}
      ast = parse(maybeAst);
    }

    const isHTMLSafe = options && options.htmlSafe;
    const formatterInstance = this.createNativeFormatter(ast, locale, this.readFormatConfig());
    const escapedOptions = isHTMLSafe ? escapeOptions(options) : options;
    const result = formatterInstance.format(escapedOptions) as string;

    return isHTMLSafe ? htmlSafe(result) : result;
  }
}
