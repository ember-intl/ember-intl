import { EOL } from 'node:os';
import { join } from 'node:path';

import type { Plugin } from 'vite';

import { analyzeProject, createOptions } from './steps/index.js';
import type { Options, UserConfig } from './types/index.js';

function getFoldersToWatch(options: Options): string[] {
  const { config, projectRoot } = options;

  const filePaths: string[] = [
    // TODO: Vite/chokidar can't watch changes to `node_modules`
    ...config.addonPaths.map((addonPath) => {
      return join(projectRoot, addonPath, 'translations');
    }),
    join(projectRoot, 'translations'),
  ];

  return filePaths;
}

export function loadTranslations(userConfig?: UserConfig): Plugin {
  const virtualModuleId = 'virtual:ember-intl/translations' as const;
  const resolvedVirtualModuleIds = new Set<string>();
  let _options: Options | undefined;

  return {
    name: 'ember-intl-load-translations',

    resolveId(id) {
      if (!id.startsWith(virtualModuleId) || !id.endsWith('.js')) {
        return;
      }

      const resolvedVirtualModuleId = `\0${id}`;
      resolvedVirtualModuleIds.add(resolvedVirtualModuleId);

      return resolvedVirtualModuleId;
    },

    load(id) {
      if (!resolvedVirtualModuleIds.has(id)) {
        return;
      }

      const options = createOptions(userConfig);
      _options = options;

      const { translations } = analyzeProject(options);
      const locale = id
        .replace(`\0${virtualModuleId}/`, '')
        .replace(/\.js$/, '');

      console.log(translations.get(locale));

      return [
        `const translations = ${JSON.stringify(translations.get(locale) ?? {})};`,
        ``,
        `export default translations;`,
      ].join(EOL);
    },

    async handleHotUpdate({ file: filePath, server }) {
      if (!_options) {
        return;
      }

      const foldersToWatch = getFoldersToWatch(_options);

      const isTranslation = foldersToWatch.some((folder) => {
        return filePath.startsWith(folder);
      });

      if (!isTranslation) {
        return;
      }

      const promises = Array.from(resolvedVirtualModuleIds).reduce(
        (accumulator, id) => {
          const module = server.moduleGraph.getModuleById(id);

          if (module) {
            accumulator.push(server.reloadModule(module));
          }

          return accumulator;
        },
        [] as Promise<void>[],
      );

      await Promise.allSettled(promises);
    },
  };
}
