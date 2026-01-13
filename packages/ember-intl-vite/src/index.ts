import { EOL } from 'node:os';

import type { Plugin } from 'vite';

import { createOptions } from './steps/index.js';
import type { UserConfig } from './types/index.js';
import { getLocale, resolveModuleId } from './utils/vite.js';

export function loadTranslations(userConfig?: UserConfig): Plugin {
  return {
    name: 'ember-intl-load-translations',

    resolveId(id) {
      return resolveModuleId(id);
    },

    load(id) {
      const locale = getLocale(id);

      if (locale === undefined) {
        return;
      }

      const options = createOptions(userConfig);
      const translations = {};

      return [
        `const translations = ${JSON.stringify(translations)};`,
        ``,
        `export default translations;`,
      ].join(EOL);
    },
  };
}
