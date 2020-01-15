/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

import Ember from 'ember';
import memoize from 'fast-memoize';
import { htmlSafe } from '@ember/string';
import { assign } from '@ember/polyfills';
import IntlMessageFormat from '@ember-intl/intl-messageformat';
import Formatter, { FormatterOptions, FormatterContext } from './-base';

const { keys } = Object;

const {
  Handlebars: {
    Utils: { escapeExpression }
  }
} = Ember;

function escape(hash?: { [key: string]: any }) {
  if (!hash) {
    return;
  }

  return keys(hash).reduce((accum, key) => {
    if (typeof hash[key] === 'string') {
      accum[key] = escapeExpression(hash[key]);
    }

    return accum;
  }, assign({}, hash));
}

/**
 * @private
 * @hide
 */
export default class FormatMessage implements Formatter<string> {
  createNativeFormatter = memoize((message, locales, formats) => {
    return new IntlMessageFormat(message, locales, formats);
  });

  format(message: string, options: FormatterOptions | undefined, { formats, locale }: FormatterContext) {
    const isHTMLSafe = options && options.htmlSafe;
    const formatter = this.createNativeFormatter(message, locale, formats);
    const escapedOptions = isHTMLSafe ? escape(options) : options;
    const result = formatter.format(escapedOptions);

    return isHTMLSafe ? htmlSafe(result) : result;
  }
}
