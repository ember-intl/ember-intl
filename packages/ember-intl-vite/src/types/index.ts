export type Options = Partial<{
  addonPaths: string[];
  buildOptions: Partial<{
    fallbackLocale: string;
    inputPath: string;
    publicOnly: boolean;
    wrapTranslationsWithNamespace: boolean;
  }>;
}>;
