import type { LintRules } from '../lint-rules.js';

export type Config = {
  addonPaths: string[];
  buildOptions: {
    fallbackLocale: string | undefined;
    namespaceKeysByDir: boolean;
    translationsDir: string;
  };
  lintRules: LintRules;
};

export type UserConfig = Partial<{
  addonPaths: Config['addonPaths'];
  buildOptions: Partial<Config['buildOptions']>;
  lintRules: Partial<Config['lintRules']>;
}>;
