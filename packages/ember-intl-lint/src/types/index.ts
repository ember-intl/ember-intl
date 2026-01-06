import type { LintRule } from '../utils/lint-rules.js';

type CodemodOptions = {
  fix: boolean;
  projectRoot: string;
};

type Options = {
  config: Config;
  fix: boolean;
  projectRoot: string;
  src: 'addon' | 'app' | 'src';
};

type Config = {
  addonPaths: string[];
  buildOptions: {
    inputPath: string;
    wrapTranslationsWithNamespace: boolean;
  };
  lintRules: Record<LintRule, boolean | LintOptions>;
};

type IcuArguments = Record<IcuArgumentType, Set<string>>;

type IcuArgumentType =
  | 'argument'
  | 'date'
  | 'number'
  | 'plural'
  | 'select'
  | 'time';

type LintErrors = string[];

type LintMethod = (project: Project, lintOptions?: LintOptions) => LintErrors;

type LintOptions = Record<string, unknown>;

type LintResults = Record<LintRule, LintErrors>;

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
      translationsDir: string;
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
  IcuArguments,
  IcuArgumentType,
  LintErrors,
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
