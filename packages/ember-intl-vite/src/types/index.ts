type IndexSignatureParameter = string | number | symbol;

type NestedStructure<T extends IndexSignatureParameter> = {
  [Key in IndexSignatureParameter]?: T | NestedStructure<T>;
};

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

type Translations = NestedStructure<string>;

type UserConfig = Partial<{
  addonPaths: string[];
  buildOptions: Partial<BuildOptions>;
}>;

export type { Config, Translations, UserConfig };
