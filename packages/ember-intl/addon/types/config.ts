import type { CustomFormatConfig } from '@formatjs/intl';

type Foo = CustomFormatConfig<'date'>;

export type EmberIntlConfig = {
  formats?: {
    date: Foo;
  };

  options?: {
    errorOnMissingTranslations?: boolean;
    errorOnNamedArgumentMismatch?: boolean;
    excludeLocales?: string[];
    fallbackLocale: string | null;
    includeLocales?: string[];
    inputPath: string;
    publicOnly?: boolean;
    stripEmptyTranslations?: boolean;
    wrapTranslationsWithNamespace?: boolean;
  };
};
