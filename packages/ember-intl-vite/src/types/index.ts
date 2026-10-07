import type { Config, UserConfig } from '@ember-intl/utils/config';
import type {
  Project,
  TranslationJson,
  TranslationKey,
} from '@ember-intl/utils/translations';

type Locale = string;

type Options = {
  config: Config;
  projectRoot: string;
};

export type {
  Locale,
  Options,
  Project,
  TranslationJson,
  TranslationKey,
  UserConfig,
};
