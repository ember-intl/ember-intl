import type { Config } from '../../types/index.js';
import { lintRules } from '../lint-rules.js';

export function getDefaultConfig(): Config {
  const rules = {} as Config['lintRules'];

  lintRules.forEach((lintRule) => {
    rules[lintRule] = true;
  });

  return {
    addonPaths: [],
    buildOptions: {
      fallbackLocale: undefined,
      inputPath: 'translations',
      wrapTranslationsWithNamespace: false,
    },
    lintRules: rules,
  };
}
