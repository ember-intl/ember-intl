'use strict';

/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

const SilentError = require('silent-error');
const isValidLocaleFormat = require('../../lib/utils/is-valid-locale-format');

module.exports = {
  description: 'Adds an empty translation file and locale is supported',

  normalizeEntityName(locale) {
    if (!locale) {
      throw new SilentError('[ember-intl] no locale provided. Usage: `ember g translation en-us`');
    }

    return locale;
  },

  beforeInstall(options) {
    let locale = options.entity.name;

    if (!isValidLocaleFormat(locale)) {
      this.ui.writeLine(
        'Full list of supported locales: https://ember-intl.github.io/ember-intl/docs/guide/supported-locales'
      );

      throw new SilentError(`[ember-intl] Invalid locale format: "${locale}"`);
    }
  },

  fileMapTokens() {
    let intlAddon = this.project.findAddonByName('ember-intl');
    let config = intlAddon.readConfig('development', this.project);

    return {
      __prefix__() {
        if (config.inputPath) {
          return config.inputPath;
        }

        return 'translations';
      },
      __name__(options) {
        return options.dasherizedModuleName;
      },
    };
  },
};
