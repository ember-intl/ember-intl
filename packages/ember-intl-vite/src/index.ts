import { join } from 'node:path';

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
  let translationFiles: Project['translationFiles'] | undefined;
  let translations: Project['translations'] | undefined;

  return {
    name: 'ember-intl-load-translations',

    async buildStart(): Promise<void> {
      const projectRoot = process.cwd();
      options = await createOptions(projectRoot);

      ({ translationFiles, translations } = analyzeProject(options));
    },

    resolveId(id): string | undefined {
      return moduleTracker.resolveModuleId(id);
    },

    load(id): string | undefined {
      const locale = moduleTracker.getLocale(id);

      if (
        options === undefined ||
        translationFiles === undefined ||
        translations === undefined ||
        locale === undefined
      ) {
        return;
      }

      /*
        Register translation files as dependencies of the virtual module,
        so that bundlers that only watch the module graph (e.g. Vite's
        `bundledDev` mode) rebuild the module when a file changes.
      */
      for (const filePath of translationFiles.keys()) {
        this.addWatchFile(join(options.projectRoot, filePath));
      }

      return getTranslationFile(translations, locale);
    },

    watchChange(id): void {
      if (options === undefined || !isTranslationFile(id, options)) {
        return;
      }

      ({ translationFiles, translations } = analyzeProject(options));
    },

    async handleHotUpdate({ file: filePath, server }): Promise<void> {
      if (options === undefined) {
        return;
      }

      if (!isTranslationFile(filePath, options)) {
        return;
      }

      ({ translationFiles, translations } = analyzeProject(options));

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
