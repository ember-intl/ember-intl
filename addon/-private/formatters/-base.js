/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

import { warn } from '@ember/debug';
import { camelize } from '@ember/string';
import { A as emberArray } from '@ember/array';

const EMPTY_OBJECT = {};

/**
 * @private
 * @hide
 */
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
      warn(
        `[ember-intl] no locale has been set!  See: https://ember-intl.github.io/ember-intl/docs/quickstart#4-configure-ember-intl`,
        false,
        {
          id: 'ember-intl-no-locale-set',
        }
      );
    }

    const formatterInstance = this.createNativeFormatter(locale, formatterOptions);

    return formatterInstance.format(value, formatOptions);
  }
}
