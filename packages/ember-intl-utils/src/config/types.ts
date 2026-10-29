import type { LintRules } from '../lint-rules.js';

export type Dependency = {
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
  lintOptions: {
    dependencies?: Dependency[];
    rules: LintRules;
  };
};

export type UserConfig = Partial<{
  addonPaths: Config['addonPaths'];
  buildOptions: Partial<Config['buildOptions']>;
  lintOptions: Partial<{
    dependencies: Dependency[];
    rules: Partial<Config['lintOptions']['rules']>;
  }>;
  lintRules: Partial<LintRules>;
}>;
