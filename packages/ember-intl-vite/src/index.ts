import { EOL } from 'node:os';

import type { Plugin } from 'vite';

import { analyzeProject, createOptions } from './steps/index.js';
import { getLocale, resolveModuleId } from './utils/vite.js';

export function loadTranslations(): Plugin {
  return {
    name: 'ember-intl-load-translations',

    resolveId(id) {
      return resolveModuleId(id);
    },

    async load(id) {
      const locale = getLocale(id);

      if (locale === undefined) {
        return;
      }

      const projectRoot = process.cwd();
      const options = await createOptions(projectRoot);

      const { translations } = analyzeProject(options);

      if (translations.get(locale) === undefined) {
        return;
      }

      return [
        `const translations = ${JSON.stringify(translations.get(locale))};`,
        ``,
        `export default translations;`,
      ].join(EOL);
    },
  };
}
