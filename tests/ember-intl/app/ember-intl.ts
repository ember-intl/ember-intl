import type { Formats } from 'ember-intl';

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
