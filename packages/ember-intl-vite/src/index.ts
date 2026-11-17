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
  let project: Project | undefined;

  return {
    name: 'ember-intl-load-translations',

    async buildStart(): Promise<void> {
      const projectRoot = process.cwd();

      options = await createOptions(projectRoot);
      project = analyzeProject(options);
    },

    resolveId(id): string | undefined {
      return moduleTracker.resolveModuleId(id);
    },

    load(id): string | undefined {
      if (options === undefined || project === undefined) {
        return;
      }

      const locale = moduleTracker.getLocale(id);

      if (locale === undefined) {
        return;
      }

      const { projectRoot } = options;
      const { translations, translationFiles } = project;

      /*
        Register translation files as dependencies of the virtual module,
        so that bundlers that only watch the module graph (e.g. Vite's
        `bundledDev` mode) rebuild the module when a file changes.
      */
      for (const filePath of translationFiles.keys()) {
        this.addWatchFile(join(projectRoot, filePath));
      }

      return getTranslationFile(translations, locale);
    },

    watchChange(id): void {
      if (options === undefined || !isTranslationFile(id, options)) {
        return;
      }

      project = analyzeProject(options);
    },

    async handleHotUpdate({ file: filePath, server }): Promise<void> {
      if (options === undefined) {
        return;
      }

      if (!isTranslationFile(filePath, options)) {
        return;
      }

      project = analyzeProject(options);

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
