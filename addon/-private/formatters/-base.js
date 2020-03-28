/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

import { warn } from '@ember/debug';
import { camelize } from '@ember/string';

const EMPTY_OBJECT = Object.create(null);

/**
 * @private
 * @hide
 */
export default class FormatterBase {
  constructor(config) {
    this.config = config;
    this.readFormatConfig = config.readFormatConfig;
  }

  get options() {
    return [];
  }

  /**
   * Filters out all of the whitelisted formatter options
   *
   * @method readOptions
   * @param {Object} Options object
   * @return {Object} Options object containing just whitelisted options
   * @private
   */
  parseOptions(options) {
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

  readOptions(formatOptions) {
    let formatterOptions = this.parseOptions(formatOptions);

    if (formatOptions && 'format' in formatOptions) {
      const namedFormatsOptions = this.getNamedFormat(formatOptions.format);

      formatterOptions = {
        ...formatterOptions,
        ...namedFormatsOptions,
      };
    }

    return formatterOptions;
  }

  validateFormatterOptions(locale /*, formatterOptions*/) {
    if (!locale) {
      // TODO: config.onError instead?
      warn(
        `[ember-intl] no locale has been set!  See: https://ember-intl.github.io/ember-intl/docs/quickstart#4-configure-ember-intl`,
        false,
        {
          id: 'ember-intl-no-locale-set',
        }
      );
    }
  }

  getNamedFormat(key) {
    const formats = this.readFormatConfig();
    const numberNamedFormats = formats[this.constructor.type];

    if (numberNamedFormats && numberNamedFormats[key]) {
      return numberNamedFormats[key];
    }
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
  _format(locale, value, formatterOptions, formatOptions) {
    this.validateFormatterOptions(locale, formatterOptions);

    const formatterInstance = this.createNativeFormatter(locale, formatterOptions);

    return formatterInstance.format(value, formatOptions);
  }
}
