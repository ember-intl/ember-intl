import type { Plugin } from 'vite';

import {
  analyzeProject,
  createOptions,
  getTranslationFile,
} from './steps/index.js';
import type { Options, Project } from './types/index.js';
import { isTranslationFile, ModuleTracker } from './utils/vite.js';

export function loadTranslations(): Plugin {
  const moduleTracker = new ModuleTracker();

  let options: Options | undefined;
  let translations: Project['translations'] | undefined;

  return {
    name: 'ember-intl-load-translations',

    async buildStart() {
      const projectRoot = process.cwd();
      options = await createOptions(projectRoot);

      ({ translations } = analyzeProject(options));
    },

    resolveId(id) {
      return moduleTracker.resolveModuleId(id);
    },

    load(id) {
      const locale = moduleTracker.getLocale(id);

      if (translations === undefined || locale === undefined) {
        return;
      }

      return getTranslationFile(translations, locale);
    },

    async handleHotUpdate({ file: filePath, server }) {
      if (options === undefined) {
        return;
      }

      if (!isTranslationFile(filePath, options)) {
        return;
      }

      ({ translations } = analyzeProject(options));

      const promises = moduleTracker
        .getResolvedModuleIds()
        .reduce((accumulator, id) => {
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
