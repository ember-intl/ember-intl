import type { Config, UserConfig } from '@ember-intl/utils/config';

type Locale = string;

type Options = {
  config: Config;
  projectRoot: string;
};

type Project = {
  translationFiles: Map<
    TranslationFilePath,
    {
      isInternal: boolean;
      locale: Locale;
      translationsDir: string;
    }
  >;
  translations: Map<Locale, Map<TranslationKey, ProjectTranslationData>>;
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
