type CodemodOptions = {
  projectRoot: string;
};

type Options = {
  config: Config;
  projectRoot: string;
};

type Config = {
  addonPaths: FilePath[];
  rules: Record<LintRule, boolean | LintOptions>;
};

type FilePath = string;

type LintMethods = Record<
  LintRule,
  (project: Project, lintOptions?: LintOptions) => string[]
>;

type LintOptions = Record<string, unknown>;

type LintResults = Record<LintRule, string[]>;

type LintRule = 'find-missing-keys' | 'find-unused-keys';

type Project = {
  availableKeys: Map<TranslationKey, FilePath[]>;
  usedKeys: Map<TranslationKey, FilePath[]>;
};

type TranslationJson = {
  [key: TranslationKey]: string | TranslationJson;
};

type TranslationKey = string;

export type {
  CodemodOptions,
  Config,
  LintMethods,
  LintOptions,
  LintResults,
  LintRule,
  Options,
  Project,
  TranslationJson,
  TranslationKey,
};
