import type { Formats } from 'ember-intl';

export const formats: Formats = {
  'format-date': {
    'user-friendly': {
      day: 'numeric',
      month: 'long',
      weekday: 'short',
    },
  },

  'format-date-range': {
    'user-friendly': {
      day: 'numeric',
      month: 'short',
    },
  },

  'format-number': {
    compact: {
      notation: 'compact',
    },
    EUR: {
      currency: 'EUR',
      style: 'currency',
    },
    USD: {
      currency: 'USD',
      style: 'currency',
    },
  },

  'format-relative-time': {
    compact: {
      style: 'narrow',
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
