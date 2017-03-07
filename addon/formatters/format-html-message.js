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

      /* escape all attributes */
      if (typeof value === 'string') {
        value = emberHandlebars.Utils.escapeExpression(value);
      }

      result[hashKey] = value;

      return result;
    }, {});
  },

  format(value, hash = {}) {
    const options = this.escapeProps(hash);
    const superResult = this._super(value, options, hash.locale);

    return emberString.htmlSafe(superResult);
  }
});

export default FormatHtmlMessage;
