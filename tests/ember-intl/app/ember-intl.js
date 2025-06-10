export const config = {
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

export const formats = {
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
