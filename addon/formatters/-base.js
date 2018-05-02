/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

import { camelize } from '@ember/string';
import EmberObject, { get } from '@ember/object';

import links from '../utils/links';

const EMPTY_OBJECT = {};

const FormatterBase = EmberObject.extend({
  init() {
    this._super();

    if (this.constructor === FormatterBase) {
      throw new Error('FormatHelper is an abstract class, can not be instantiated directly.');
    }
  },

  /**
   * Filters out all of the whitelisted formatter options
   *
   * @method readOptions
   * @param {Object} Options object
   * @return {Object} Options object containing just whitelisted options
   * @private
   */
  readOptions(options) {
    if (!options) {
      return EMPTY_OBJECT;
    }

    let found = {};

    for (let key in options) {
      let normalized = camelize(key);

      if (this.constructor.options.has(normalized)) {
        found[normalized] = options[key];
      }
    }

    return found;
  },

  format() {
    throw new Error('not implemented');
  },

  /**
   * Invokes the Intl formatter methods
   *
   * @method _format
   * @param {value} Raw input value that needs formatting
   * @return {Object} Formatter options hash
   * @return {Object} Format options hash
   * @private
   */
  _format(value, formatterOptions, formatOptions, { locale }) {
    if (!locale) {
      throw new Error(
        `No locale specified.  This is typically handled within routes/application.js.
        Documentation: ${links.unsetLocale}`
      );
    }

    return get(this, 'formatter')(locale, formatterOptions).format(value, formatOptions);
  }
});

FormatterBase.reopenClass({
  options: new Set(['locale', 'format'])
});

export default FormatterBase;
