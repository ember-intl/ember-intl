type BuildOptions = {
  fallbackLocale: string | undefined;
  inputPath: string;
  publicOnly: boolean;
  wrapTranslationsWithNamespace: boolean;
};

type Config = {
  addonPaths: string[];
  buildOptions: BuildOptions;
};

type Locale = string;

type Options = {
  config: Config;
  projectRoot: string;
};

type Project = {
  translationFiles: Map<
    TranslationFilePath,
    {
      format: 'json' | 'yaml';
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
  buildOptions: Partial<BuildOptions>;
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
