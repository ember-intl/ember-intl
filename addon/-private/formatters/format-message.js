/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

import Ember from 'ember';
import { htmlSafe } from '@ember/string';
import createFormatCache from 'intl-format-cache';
import IntlMessageFormat from 'intl-messageformat';

import Formatter from './-base';

const { Handlebars } = Ember;

const FormatMessage = Formatter.extend({
  formatCache: createFormatCache(IntlMessageFormat),

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
  },

  format(value, options, { formats, locale }) {
    let isHTMLSafe = options && options.htmlSafe;
    let values = isHTMLSafe ? this.escape(options) : options;
    let result = this.formatCache(value, locale, formats).format(values);

    return isHTMLSafe ? htmlSafe(result) : result;
  }
});

FormatMessage.reopenClass({
  formatType: 'message'
});

export default FormatMessage;
