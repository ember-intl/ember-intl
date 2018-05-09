/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

import { htmlSafe } from '@ember/string';
import Ember from 'ember';
import createFormatCache from 'intl-format-cache';
import IntlMessageFormat from 'intl-messageformat';
import Formatter from './-base';

const { Handlebars } = Ember;

export default class FormatMessage extends Formatter {
  constructor() {
    super();
    this.formatter = createFormatCache(IntlMessageFormat);
  }

  escape(options) {
    if (!options) {
      return;
    }

    return Object.keys(options).reduce((result, hashKey) => {
      let value = options[hashKey];

      if (typeof value === 'string') {
        value = Handlebars.Utils.escapeExpression(value);
      }

      result[hashKey] = value;

      return result;
    }, {});
  }

  format(value, options, { formats, locale }) {
    let isHTMLSafe = options && options.htmlSafe;
    let safeOptions = isHTMLSafe ? this.escape(options) : options;
    let result = this.formatter(value, locale, formats).format(safeOptions);

    return isHTMLSafe ? htmlSafe(result) : result;
  }
}
