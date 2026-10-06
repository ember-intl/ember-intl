import type { Config, UserConfig } from '@ember-intl/utils/config';
import type { LintRule } from '@ember-intl/utils/lint-rules';

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

type IcuArguments = Record<IcuArgumentType, Set<string>>;

type IcuArgumentType =
  'argument' | 'date' | 'number' | 'plural' | 'select' | 'time';

type LintErrors = string[];

type LintMethod = (
  project: Project,
  lintRuleOptions: Record<string, unknown>,
  options: Options,
) => LintErrors | Promise<LintErrors>;

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

type TranslationJson = Record<TranslationKey, TranslationMessage>;

type TranslationKey = string;

type TranslationMessage = string;

export type {
  CodemodOptions,
  Config,
  IcuArguments,
  IcuArgumentType,
  LintErrors,
  LintMethod,
  LintResults,
  LintRule,
  Locale,
  Options,
  Project,
  ProjectTranslationData,
  TranslationFilePath,
  TranslationJson,
  TranslationKey,
  TranslationMessage,
  UserConfig,
};
