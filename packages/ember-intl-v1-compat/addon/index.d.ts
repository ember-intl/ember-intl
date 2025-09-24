export type Config = {
  errorOnMissingTranslations?: boolean;
  errorOnNamedArgumentMismatch?: boolean;
  excludeLocales?: string[] | null;
  fallbackLocale?: string | null;
  includeLocales?: string[] | null;
  inputPath?: string;
  outputPath?: string;
  publicOnly?: boolean;
  requiresTranslation?: (key: string, locale: string) => boolean;
  stripEmptyTranslations?: boolean;
  verbose?: boolean;
  wrapTranslationsWithNamespace?: boolean;
};
