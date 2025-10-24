import type { Formats } from 'ember-intl';

export const formats: Formats = {
  formatDate: {
    'user-friendly': {
      day: 'numeric',
      month: 'long',
      weekday: 'short',
    },
  },

  formatDateRange: {
    'user-friendly': {
      day: 'numeric',
      month: 'short',
    },
  },

  formatNumber: {
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

  formatRelativeTime: {
    compact: {
      style: 'narrow',
    },
  },

  formatTime: {
    hhmmss: {
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
    },
  },
};
