import type { LintRule } from '../lint-rules.js';

type LintRuleOptions = Record<string, unknown>;

export type Config = {
  addonPaths: string[];
  buildOptions: {
    fallbackLocale: string | undefined;
    namespaceKeysByDir: boolean;
    translationsDir: string;
  };
  lintRules: Record<LintRule, boolean | LintRuleOptions>;
};

export type UserConfig = Partial<{
  addonPaths: Config['addonPaths'];
  buildOptions: Partial<Config['buildOptions']>;
  lintRules: Partial<Config['lintRules']>;
}>;
