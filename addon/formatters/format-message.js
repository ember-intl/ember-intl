/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

import Ember from 'ember';
import { htmlSafe } from '@ember/string';
import { computed, get } from '@ember/object';
import createFormatCache from 'intl-format-cache';
import IntlMessageFormat from 'intl-messageformat';

import Formatter from './-base';

const { Handlebars } = Ember;

const FormatMessage = Formatter.extend({
  formatter: computed({
    get() {
      return createFormatCache(IntlMessageFormat);
    }
  }).readOnly(),

  escapeProps(options) {
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
    let _options = isHTMLSafe ? this.escapeProps(options) : options;
    let result = get(this, 'formatter')(value, locale, formats).format(_options);

    return isHTMLSafe ? htmlSafe(result) : result;
  }
});

FormatMessage.reopenClass({
  formatType: 'message'
});

export default FormatMessage;
