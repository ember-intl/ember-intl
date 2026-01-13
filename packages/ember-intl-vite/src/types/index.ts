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

type UserConfig = Partial<{
  addonPaths: string[];
  buildOptions: Partial<BuildOptions>;
}>;

export type { Config, Locale, Options, UserConfig };
