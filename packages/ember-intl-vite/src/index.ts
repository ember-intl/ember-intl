import { EOL } from 'node:os';

import type { Plugin } from 'vite';

import { getTranslations } from './steps/index.js';
import type { UserConfig } from './types/index.js';

export function loadTranslations(userConfig?: UserConfig): Plugin {
  const virtualModuleId = 'virtual:ember-intl/translations' as const;
  const resolvedVirtualModuleIds = new Set<string>();

  return {
    name: 'ember-intl-load-translations',

    resolveId(id) {
      if (!id.startsWith(virtualModuleId)) {
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

      console.log(userConfig);

      const locale = id.replace(`\0${virtualModuleId}/`, '');
      const translations = getTranslations(locale);

      return [
        `const translations = ${JSON.stringify(translations)};`,
        ``,
        `export default translations;`,
      ].join(EOL);
    },
  };
}
