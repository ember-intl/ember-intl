type Config = {
  addonPaths: string[];
  buildOptions: ConfigBuildOptions;
};

type ConfigBuildOptions = {
  fallbackLocale: string | undefined;
  namespaceKeysByDir: boolean;
  translationsDir: string;
};

type ConfigLintRules = Record<string, boolean | Record<string, unknown>>;

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

type UserConfig = Partial<{
  addonPaths: string[];
  buildOptions: Partial<ConfigBuildOptions>;
  lintRules: Partial<ConfigLintRules>;
}>;

export type {
  Config,
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
