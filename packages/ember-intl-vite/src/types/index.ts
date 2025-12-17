export type Options = Partial<{
  addonPaths: string[];
  buildOptions: Partial<{
    fallbackLocale: string;
    inputPath: string;
    publicOnly: boolean;
    wrapTranslationsWithNamespace: boolean;
  }>;
}>;

type IndexSignatureParameter = string | number | symbol;

type NestedStructure<T extends IndexSignatureParameter> = {
  [Key in IndexSignatureParameter]?: T | NestedStructure<T>;
};

export type Translations = NestedStructure<string>;
