import type { LintRules } from '../lint-rules.js';

export type TranslationHelper = {
  importName: string;
  importPath: string;
};

export type Config = {
  addonPaths: string[];
  buildOptions: {
    fallbackLocale: string | undefined;
    namespaceKeysByDir: boolean;
    translationsDir: string;
  };
  lintRules: LintRules;
  translationHelpers?: readonly TranslationHelper[];
};

export type UserConfig = Partial<{
  addonPaths: Config['addonPaths'];
  buildOptions: Partial<Config['buildOptions']>;
  lintRules: Partial<Config['lintRules']>;
  translationHelpers: readonly TranslationHelper[];
}>;
