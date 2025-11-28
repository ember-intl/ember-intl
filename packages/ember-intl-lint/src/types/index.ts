type CodemodOptions = {
  projectRoot: string;
};

type Options = {
  projectRoot: string;
};

type FilePath = string;

type LintMethods = Record<LintRule, (project: Project) => string[]>;

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
  LintMethods,
  LintResults,
  LintRule,
  Options,
  Project,
  TranslationJson,
  TranslationKey,
};
