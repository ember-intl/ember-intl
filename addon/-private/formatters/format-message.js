/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

import Ember from 'ember';
import memoize from 'fast-memoize';
import { htmlSafe } from '@ember/string';
import { assign } from '@ember/polyfills';
import IntlMessageFormat from 'intl-messageformat';
import Formatter from './-base';

const { keys } = Object;

const {
  Handlebars: {
    Utils: { escapeExpression },
  },
} = Ember;

function escape(hash) {
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
export default class FormatMessage extends Formatter {
  constructor(config) {
    super(config);

    this.createNativeFormatter = memoize((ast, locales, formats) => {
      return new IntlMessageFormat(ast, locales, formats);
    });
  }

  format(ast, options, { formats, locale }) {
    const isHTMLSafe = options && options.htmlSafe;
    const formatterInstance = this.createNativeFormatter(ast, locale, formats);
    const escapedOptions = isHTMLSafe ? escape(options) : options;

    // TODO: convert this parse if `ast` is a string (it can be if not going through .t() paths)
    // Will enable us to do more things here if we are only ever dealing with the message ast
    const result = formatterInstance.format(escapedOptions);

    return isHTMLSafe ? htmlSafe(result) : result;
  }
}
