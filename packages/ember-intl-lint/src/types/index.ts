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

type IcuArguments = Record<IcuArgumentType, Set<string>>;

type IcuArgumentType =
  | 'argument'
  | 'date'
  | 'number'
  | 'plural'
  | 'select'
  | 'time';

type LintMethods = Record<
  LintRule,
  (project: Project, lintOptions?: LintOptions) => Failed
>;

type LintOptions = Record<string, unknown>;

type LintResults = Record<LintRule, Failed>;

type LintRule = 'no-missing-keys' | 'no-unused-keys';

type Project = {
  availableKeys: Map<
    TranslationKey,
    Map<
      TranslationFilePath,
      {
        message: TranslationMessage;
      }
    >
  >;
  translationFiles: Map<
    TranslationFilePath,
    {
      format: 'json' | 'yaml';
      isInternal: boolean;
    }
  >;
  usedKeys: Map<TranslationKey, SourceFilePath[]>;
};

type SourceFilePath = string;

type TranslationFilePath = string;

type TranslationJson = {
  [key: TranslationKey]: TranslationJson | TranslationMessage;
};

type TranslationKey = string;

type TranslationMessage = string;

type TranslationObject = Record<TranslationKey, TranslationMessage>;

export type {
  CodemodOptions,
  Config,
  Failed,
  IcuArguments,
  IcuArgumentType,
  LintMethods,
  LintOptions,
  LintResults,
  LintRule,
  Options,
  Project,
  TranslationJson,
  TranslationKey,
  TranslationMessage,
  TranslationObject,
};
