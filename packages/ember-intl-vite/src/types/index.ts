type Config = {
  addonPaths: string[];
  buildOptions: ConfigBuildOptions;
};

type ConfigBuildOptions = {
  fallbackLocale: string | undefined;
  inputPath: string;
  wrapTranslationsWithNamespace: boolean;
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
  translations: Map<Locale, TranslationObject>;
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
  Config,
  Locale,
  Options,
  Project,
  TranslationFilePath,
  TranslationJson,
  TranslationKey,
  TranslationMessage,
  TranslationObject,
  UserConfig,
};
