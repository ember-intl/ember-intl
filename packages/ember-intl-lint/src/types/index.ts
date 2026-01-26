import type { LintRule } from '../utils/lint-rules.js';

type CodemodOptions = {
  fix: boolean;
  projectRoot: string;
};

type Config = {
  addonPaths: string[];
  buildOptions: ConfigBuildOptions;
  lintRules: ConfigLintRules;
};

type Options = {
  config: Config;
  fix: boolean;
  projectRoot: string;
  src: 'addon' | 'app' | 'src';
};

type OptionsWithoutConfig = Omit<Options, 'config'>;

type ConfigBuildOptions = {
  fallbackLocale: string | undefined;
  inputPath: string;
  wrapTranslationsWithNamespace: boolean;
};

type ConfigLintRules = Record<LintRule, boolean | LintOptions>;

type IcuArguments = Record<IcuArgumentType, Set<string>>;

type IcuArgumentType =
  | 'argument'
  | 'date'
  | 'number'
  | 'plural'
  | 'select'
  | 'time';

type LintErrors = string[];

type LintMethod = (
  project: Project,
  lintOptions: LintOptions,
  options: OptionsWithoutConfig,
) => LintErrors;

type LintOptions = Record<string, unknown>;

type LintResults = Record<LintRule, LintErrors>;

type Locale = string;

type Project = {
  availableKeys: Map<TranslationKey, Map<Locale, ProjectTranslationData>>;
  translationFiles: Map<
    TranslationFilePath,
    {
      isInternal: boolean;
      locale: Locale;
      translationsDir: string;
    }
  >;
  translations: Map<Locale, Map<TranslationKey, ProjectTranslationData>>;
  usedKeys: Set<TranslationKey>;
};

type ProjectTranslationData = {
  filePath: TranslationFilePath;
  message: TranslationMessage;
};

type TranslationFilePath = string;

type TranslationJson = {
  [key: TranslationKey]: TranslationJson | TranslationMessage;
};

type TranslationKey = string;

type TranslationMessage = string;

type TranslationObject = Record<TranslationKey, TranslationMessage>;

type UserConfig = Partial<{
  addonPaths: string[];
  buildOptions: Partial<ConfigBuildOptions>;
  lintRules: Partial<ConfigLintRules>;
}>;

export type {
  CodemodOptions,
  Config,
  IcuArguments,
  IcuArgumentType,
  LintErrors,
  LintMethod,
  LintOptions,
  LintResults,
  Locale,
  Options,
  OptionsWithoutConfig,
  Project,
  ProjectTranslationData,
  TranslationFilePath,
  TranslationJson,
  TranslationKey,
  TranslationMessage,
  TranslationObject,
  UserConfig,
};
