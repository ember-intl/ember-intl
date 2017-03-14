/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

import Ember from 'ember';
import FormatterMessage from './format-message';

const { String:emberString, Handlebars:emberHandlebars } = Ember;

const FormatHtmlMessage = FormatterMessage.extend({
  escapeProps(options) {
    if (!options) {
      return;
    }

    return Object.keys(options).reduce((result, hashKey) => {
      let value = options[hashKey];

      if (typeof value === 'string') {
        value = emberHandlebars.Utils.escapeExpression(value);
      }

      result[hashKey] = value;

      return result;
    }, {});
  },

  format(value, options, ctx) {
    let escapedOptions = this.escapeProps(options);
    let superResult = this._super(value, escapedOptions, ctx);

    return emberString.htmlSafe(superResult);
  }
});

FormatHtmlMessage.reopenClass({
  formatType: 'html-message'
});

export default FormatHtmlMessage;
