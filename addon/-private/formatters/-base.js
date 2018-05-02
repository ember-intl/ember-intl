/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

import { camelize } from '@ember/string';
import { A as emberArray } from '@ember/array';

import links from '../../utils/links';

const EMPTY_OBJECT = {};

export default class FormatterBase {
  get options() {
    return emberArray();
  }

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

      if (this.options.includes(normalized)) {
        found[normalized] = options[key];
      }
    }

    return found;
  }

  format() {
    throw new Error('not implemented');
  }

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

    return this.formatter(locale, formatterOptions).format(value, formatOptions);
  }
}
