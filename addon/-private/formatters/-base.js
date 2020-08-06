/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

import { warn } from '@ember/debug';

const EMPTY_OBJECT = Object.create(null);

/**
 * @private
 * @hide
 */
export default class FormatterBase {
  constructor(config) {
    this.config = config;

    // NOTE: a fn since we lazily grab the formatter from the config
    // as it can change at runtime by calling intl.set('formats', {...});
    this.readFormatConfig = config.readFormatConfig;
  }

  get options() {
    return [];
  }

  /**
   * Filters out all of the whitelisted formatter options
   *
   * @method filterKnownOptions
   * @param {Object} Options object
   * @return {Object} Options object containing just whitelisted options
   * @private
   */
  filterKnownOptions(options) {
    if (!options) {
      return EMPTY_OBJECT;
    }

    let found = {};

    for (let key in options) {
      if (this.options.includes(key)) {
        found[key] = options[key];
      }
    }

    return found;
  }

  readOptions(formatOptions) {
    let formatterOptions = this.filterKnownOptions(formatOptions);

    if (formatOptions && 'format' in formatOptions) {
      const namedFormatsOptions = this.getNamedFormat(formatOptions.format);

      formatterOptions = {
        ...namedFormatsOptions,
        ...formatterOptions,
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
    const namedFormatsForType = formats[this.constructor.type];

    if (namedFormatsForType && namedFormatsForType[key]) {
      return namedFormatsForType[key];
    }
  }

  format() {
    throw new Error('not implemented');
  }
}
