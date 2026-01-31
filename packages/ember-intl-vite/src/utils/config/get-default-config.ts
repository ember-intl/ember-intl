import type { Config } from '../../types/index.js';

export function getDefaultConfig(): Config {
  return {
    addonPaths: [],
    buildOptions: {
      fallbackLocale: undefined,
      inputPath: 'translations',
      wrapTranslationsWithNamespace: false,
    },
  };
}
