import type { TranslationKey } from './translations.js';

export const lintRules = [
  'no-inconsistent-messages',
  'no-missing-keys',
  'no-unused-keys',
] as const;

export type LintRule = (typeof lintRules)[number];

type LintRuleOptions = {
  'no-inconsistent-messages': Partial<{
    ignores: (RegExp | TranslationKey)[];
  }>;
  'no-missing-keys': Partial<{
    ignores: (RegExp | TranslationKey)[];
  }>;
  'no-unused-keys': Partial<{
    ignores: (RegExp | TranslationKey)[];
  }>;
};

export type LintRules = {
  [K in LintRule]: boolean | LintRuleOptions[K];
};
