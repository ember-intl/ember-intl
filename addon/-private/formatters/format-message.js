/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

import Ember from 'ember';
import memoize from 'fast-memoize';
import { htmlSafe } from '@ember/string';
import { assign } from '@ember/polyfills';
import IntlMessageFormat from 'intl-messageformat';
import { parse } from 'intl-messageformat-parser';
import Formatter from './-base';

const { keys } = Object;

const {
  Handlebars: {
    Utils: { escapeExpression },
  },
} = Ember;

function escape(object) {
  if (typeof object !== 'object') {
    return;
  }

  return keys(object).reduce((accum, key) => {
    // NOTE due to the typeof check this won't escape if
    // the value is an Ember `SafeString`
    if (typeof object[key] === 'string') {
      accum[key] = escapeExpression(object[key]);
    }

    return accum;
  }, assign({}, object));
}

/**
 * @private
 * @hide
 */
export default class FormatMessage extends Formatter {
  constructor(config) {
    super(config);

    this.createNativeFormatter = memoize((ast, locales, formatConfig) => {
      return new IntlMessageFormat(ast, locales, formatConfig);
    });
  }

  format(locale, maybeAst, options) {
    let ast = maybeAst;

    if (typeof maybeAst === 'string') {
      // maybe memoize?  it's not a typical hot path since we
      // parse when translations are pushed to ember-intl.
      // This is only used if inlining a translation i.e.,
      // {{format-mesage "Hi {name}"}}
      ast = parse(maybeAst);
    }

    const isHTMLSafe = options && options.htmlSafe;
    const formatterInstance = this.createNativeFormatter(ast, locale, this.readFormatConfig());
    const escapedOptions = isHTMLSafe ? escape(options) : options;
    const result = formatterInstance.format(escapedOptions);

    return isHTMLSafe ? htmlSafe(result) : result;
  }
}
