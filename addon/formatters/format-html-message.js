/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

import Ember from 'ember';
import FormatterMessage from './format-message';

const { String:emberString, Handlebars:emberHandlebars } = Ember;

const FormatHtmlMessage = FormatterMessage.extend({
  escapeProps(options = {}) {
    return Object.keys(options).reduce((result, hashKey) => {
      let value = options[hashKey];

      if (typeof value === 'string') {
        value = emberHandlebars.Utils.escapeExpression(value);
      }

      result[hashKey] = value;

      return result;
    }, {});
  },

  format(value, formatOptions = {}) {
    const options = this.escapeProps(formatOptions);
    const superResult = this._super(value, options, formatOptions.locale);

    return emberString.htmlSafe(superResult);
  }
});

export default FormatHtmlMessage;
