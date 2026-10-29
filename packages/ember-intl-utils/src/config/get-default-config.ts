import { type LintRules, lintRules } from '../lint-rules.js';
import type { Config } from './types.js';

export function getDefaultConfig(): Config {
  const rules = {} as LintRules;

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
    lintOptions: {
      rules,
    },
  };
}
