import { lintRules } from '../lint-rules.js';
import type { Config } from './types.js';

export function getDefaultConfig(): Config {
  const rules = {} as Config['lintRules'];

  lintRules.forEach((lintRule) => {
    rules[lintRule] = true;
  });

  return {
    addonPaths: [],
    buildOptions: {
      fallbackLocale: undefined,
      namespaceKeysByDir: false,
      translationsDir: 'translations',
    },
    lintRules: rules,
  };
}
