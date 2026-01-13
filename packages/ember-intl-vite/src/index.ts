import { EOL } from 'node:os';
import { sep } from 'node:path';

import type { Plugin } from 'vite';

import { analyzeProject, createOptions } from './steps/index.js';
import type { Options } from './types/index.js';
import {
  getLocale,
  getResolvedModuleIds,
  isTranslationFile,
  resolveModuleId,
} from './utils/vite.js';

export function loadTranslations(): Plugin {
  let options: Options | undefined;

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

      const projectRoot = process.cwd().replaceAll(sep, '/');
      options = await createOptions(projectRoot);

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

    async handleHotUpdate({ file: filePath, server }) {
      if (options === undefined) {
        return;
      }

      if (!isTranslationFile(filePath, options)) {
        return;
      }

      const promises = getResolvedModuleIds().reduce((accumulator, id) => {
        const module = server.moduleGraph.getModuleById(id);

        if (module) {
          accumulator.push(server.reloadModule(module));
        }

        return accumulator;
      }, [] as Promise<void>[]);

      await Promise.allSettled(promises);
    },
  };
}
