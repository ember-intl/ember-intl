import type { Config, UserConfig } from '@ember-intl/utils/config';
import type { LintRule } from '@ember-intl/utils/lint-rules';
import type {
  Project as UpstreamProject,
  ProjectTranslationData,
  TranslationKey,
} from '@ember-intl/utils/translations';

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

type Project = UpstreamProject & {
  availableKeys: Map<TranslationKey, Map<Locale, ProjectTranslationData>>;
  usedKeys: Set<TranslationKey>;
};

export type {
  CodemodOptions,
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
  TranslationKey,
  UserConfig,
};
