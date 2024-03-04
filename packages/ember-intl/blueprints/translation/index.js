'use strict';

const SilentError = require('silent-error');
const isValidLocaleFormat = require('../../lib/utils/is-valid-locale-format');

/**
 * @deprecated Will be removed in v7.
 *
 * You can manually create the translation file.
 */
module.exports = {
  description: 'Adds an empty translation file and locale is supported',

  normalizeEntityName(locale) {
    if (!locale) {
      throw new SilentError(
        '[ember-intl] no locale provided. Usage: `ember g translation en-us`',
      );
    }

    return locale;
  },

  beforeInstall(options) {
    let locale = options.entity.name;

    if (!isValidLocaleFormat(locale)) {
      throw new SilentError(`[ember-intl] invalid locale format: "${locale}"`);
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
