/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

import EmberObject from '@ember/object';
import arrayToHash from '../utils/array-to-hash';
import links from '../utils/links';

const hasOwnProperty = Object.prototype.hasOwnProperty;

const FormatterBase = EmberObject.extend({
  options: null,

  init() {
    this._super(...arguments);

    if (this.constructor === FormatterBase) {
      throw new Error('FormatHelper is an abstract class, can not be instantiated directly.');
    }

    this.options = arrayToHash(this.constructor.supportedOptions);
  },

  /**
  * Filters out all of the whitelisted formatter options
  *
  * @method filterOptions
  * @param {Object} Options object
  * @return {Object} Options object containing just whitelisted options
  * @private
  */
  filterOptions(hash) {
    if (!hash) {
      return;
    }

    let supportedOptions = {};
    let match = false;

    for (let key in hash) {
      if (hasOwnProperty.call(this.options, key)) {
        match = true;
        supportedOptions[key] = hash[key];
      }
    }

    if (match) {
      return supportedOptions;
    }
  },

  format(value, formatterOptions, formatOptions, { locale }) {
    if (!locale) {
      throw new Error(
        `No locale specified.  This is typically handled within routes/application.js. Documentation: ${links.unsetLocale}`
      );
    }

    return this.formatCache(locale, formatterOptions).format(value, formatOptions);
  }
});

FormatterBase.reopenClass({
  supportedOptions: ['locale', 'format'],
  concatenatedProperties: ['supportedOptions']
});

export default FormatterBase;
