import type { LintRule } from '../utils/lint-rules.js';

type CodemodOptions = {
  projectRoot: string;
};

type Options = {
  config: Config;
  projectRoot: string;
};

type Config = {
  addonPaths: string[];
  lintRules: Record<LintRule, boolean | LintOptions>;
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

type LintMethod = (project: Project, lintOptions?: LintOptions) => Failed;

type LintOptions = Record<string, unknown>;

type LintResults = Record<LintRule, Failed>;

type Locale = string;

type Project = {
  availableKeys: Map<
    TranslationKey,
    Map<
      Locale,
      {
        filePath: TranslationFilePath;
        icuArguments: IcuArguments;
        message: TranslationMessage;
      }
    >
  >;
  translationFiles: Map<
    TranslationFilePath,
    {
      format: 'json' | 'yaml';
      isInternal: boolean;
      locale: Locale;
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
  LintMethod,
  LintOptions,
  LintResults,
  Options,
  Project,
  TranslationFilePath,
  TranslationJson,
  TranslationKey,
  TranslationMessage,
  TranslationObject,
};
