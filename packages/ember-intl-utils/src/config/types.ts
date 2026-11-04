import type { LintRules } from '../lint-rules.js';

type Dependency = 't' | 'tKey';

type DependencyOptions = {
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
    dependencies: Record<Dependency, DependencyOptions[]>;
    rules: LintRules;
  };
};

export type UserConfig = Partial<{
  addonPaths: Config['addonPaths'];
  buildOptions: Partial<Config['buildOptions']>;
  lintOptions: Partial<{
    dependencies: Partial<Record<Dependency, DependencyOptions[]>>;
    rules: Partial<Config['lintOptions']['rules']>;
  }>;
  lintRules: Partial<LintRules>;
}>;
