type Locale = string;

type ProjectTranslationData = {
  filePath: TranslationFilePath;
  message: TranslationMessage;
};

type TranslationFilePath = string;

type TranslationJson = Record<TranslationKey, TranslationMessage>;

type TranslationKey = string;

type TranslationMessage = string;

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

export type {
  Locale,
  Project,
  ProjectTranslationData,
  TranslationFilePath,
  TranslationJson,
  TranslationKey,
  TranslationMessage,
};
