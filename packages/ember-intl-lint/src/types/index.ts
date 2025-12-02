type CodemodOptions = {
  projectRoot: string;
};

type Options = {
  config: Config;
  projectRoot: string;
};

type Config = {
  addonPaths: string[];
  rules: Record<LintRule, boolean | LintOptions>;
};

type Failed = string[];

type LintMethods = Record<
  LintRule,
  (project: Project, lintOptions?: LintOptions) => Failed
>;

type LintOptions = Record<string, unknown>;

type LintResults = Record<LintRule, Failed>;

type LintRule = 'no-missing-keys' | 'no-unused-keys';

type Project = {
  availableKeys: Map<TranslationKey, TranslationFilePath[]>;
  usedKeys: Map<TranslationKey, SourceFilePath[]>;
};

type SourceFilePath = string;

type TranslationFilePath = string;

type TranslationJson = {
  [key: TranslationKey]: TranslationJson | TranslationMessage;
};

type TranslationKey = string;

type TranslationMessage = string;

export type {
  CodemodOptions,
  Config,
  Failed,
  LintMethods,
  LintOptions,
  LintResults,
  LintRule,
  Options,
  Project,
  TranslationJson,
  TranslationKey,
  TranslationMessage,
};
