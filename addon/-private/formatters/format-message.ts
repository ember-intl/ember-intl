/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

import Ember from 'ember';
import memoize from 'fast-memoize';
import { htmlSafe } from '@ember/string';
import IntlMessageFormat, { FormatOptions } from '@ember-intl/intl-messageformat';
import Formatter, { FormatterContext } from './-base';

interface SafeString {
  toString(): string;
  toHTML(): string;
}

export type Options = FormatOptions & { htmlSafe?: boolean };
export type Result = string | SafeString;

const {
  Handlebars: {
    Utils: { escapeExpression }
  }
} = Ember;

function escape(hash?: FormatOptions) {
  if (!hash) {
    return;
  }

  const escaped = {} as FormatOptions;

  for (const key in hash) {
    const val = hash[key];
    if (typeof val === 'string') {
      escaped[key] = escapeExpression(val);
    } else {
      escaped[key] = val;
    }
  }

  return escaped;
}

/**
 * @private
 * @hide
 */
export default class FormatMessage implements Formatter<string, Result, Options> {
  createNativeFormatter = memoize((message, locales, formats) => {
    return new IntlMessageFormat(message, locales, formats);
  });

  format(message: string, options?: Options, ctx?: FormatterContext) {
    const formatter = this.createNativeFormatter(message, ctx && ctx.locale, ctx && ctx.formats);

    if (options && options.htmlSafe) {
      return htmlSafe(formatter.format(escape(options)));
    }

    return formatter.format(options);
  }
}
