import type { Formats } from 'ember-intl';
import type { Config } from 'ember-intl-v1-compat';

export const config: Config = {
  errorOnMissingTranslations: false,
  errorOnNamedArgumentMismatch: false,
  fallbackLocale: null,
  inputPath: 'translations',
  publicOnly: false,
  requiresTranslation(/* key, locale */) {
    return true;
  },
  stripEmptyTranslations: false,
  wrapTranslationsWithNamespace: true,
};

export const formats: Formats = {
  'format-date': {
    hhmmss: {
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
    },
  },

  'format-number': {
    EUR: {
      currency: 'EUR',
      style: 'currency',
    },

    USD: {
      currency: 'USD',
      style: 'currency',
    },

    compact: {
      notation: 'compact',
    },

    currency: {
      minimumFractionDigits: 2,
      style: 'currency',
    },
  },

  'format-time': {
    hhmmss: {
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
    },
  },
};
