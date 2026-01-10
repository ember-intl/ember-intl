import { EOL } from 'node:os';

import type { Plugin } from 'vite';

import { analyzeProject, createOptions } from './steps/index.js';
import type { UserConfig } from './types/index.js';

export function loadTranslations(userConfig?: UserConfig): Plugin {
  const virtualModuleId = 'virtual:ember-intl/translations' as const;
  const resolvedVirtualModuleIds = new Set<string>();

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
  };
}
