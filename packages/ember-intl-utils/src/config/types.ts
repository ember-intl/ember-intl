import type { LintRules } from '../lint-rules.js';

export type Config = {
  addonPaths: string[];
  buildOptions: {
    fallbackLocale: string | undefined;
    namespaceKeysByDir: boolean;
    translationsDir: string;
  };
  lintOptions: {
    rules: LintRules;
  };
};

export type UserConfig = Partial<{
  addonPaths: Config['addonPaths'];
  buildOptions: Partial<Config['buildOptions']>;
  lintOptions: Partial<{
    rules: Partial<Config['lintOptions']['rules']>;
  }>;
  lintRules: Partial<LintRules>;
}>;
