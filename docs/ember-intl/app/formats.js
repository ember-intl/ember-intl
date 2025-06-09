export default {
  date: {
    'user-friendly': {
      day: 'numeric',
      month: 'long',
      weekday: 'short',
    },
  },

  dateTimeRange: {
    'user-friendly': {
      day: 'numeric',
      month: 'short',
    },
  },

  number: {
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

  relative: {
    compact: {
      style: 'narrow',
    },
  },

  time: {
    hhmmss: {
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
    },
  },
};
