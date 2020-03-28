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
   * @method readOptions
   * @param {Object} Options object
   * @return {Object} Options object containing just whitelisted options
   * @protected
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
    const namedFormatsForType = formats[this.constructor.type];

    if (namedFormatsForType && namedFormatsForType[key]) {
      return namedFormatsForType[key];
    }
  }

  format() {
    throw new Error('not implemented');
  }
}
