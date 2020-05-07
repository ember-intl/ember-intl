/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

import Ember from 'ember';
import memoize from 'fast-memoize';
import { htmlSafe, isHTMLSafe } from '@ember/string';
import IntlMessageFormat from 'intl-messageformat';
import parse from '../utils/parse';
import Formatter from './-base';

const {
  Handlebars: {
    Utils: { escapeExpression },
  },
} = Ember;

function escapeOptions(object) {
  if (typeof object !== 'object') {
    return;
  }

  let escapedOpts = {};

  Object.keys(object).forEach((key) => {
    let val = object[key];

    if (isHTMLSafe(val)) {
      // If the option is an instance of Ember SafeString,
      // we don't want to pass it into the formatter, since the
      // formatter won't know what to do with it. Instead, we cast
      // the SafeString to a regular string using `toHTML`.
      // Since it was already marked as safe we should *not* escape it.
      escapedOpts[key] = val.toHTML();
    } else if (typeof val === 'string') {
      escapedOpts[key] = escapeExpression(val);
    } else {
      escapedOpts[key] = val; // copy as-is
    }
  });

  return escapedOpts;
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
    const escapedOptions = isHTMLSafe ? escapeOptions(options) : options;
    const result = formatterInstance.format(escapedOptions);

    return isHTMLSafe ? htmlSafe(result) : result;
  }
}
