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
        In bundled dev mode, Vite skips `handleHotUpdate` and leaves file
        watching to Rolldown, which only watches files in its module graph.

        To support reload, we explicitly list the translation files that
        a virtual module depends on.
      */
      for (const filePath of translationFiles.keys()) {
        this.addWatchFile(join(projectRoot, filePath));
      }

      return getTranslationFile(translations, locale);
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

    watchChange(filePath): void {
      if (options === undefined) {
        return;
      }

      if (!isTranslationFile(filePath, options)) {
        return;
      }

      project = analyzeProject(options);
    },
  };
}
