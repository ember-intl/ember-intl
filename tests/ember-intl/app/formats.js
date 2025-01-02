export default {
  date: {
    hhmmss: {
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
    },
  },

  number: {
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

  time: {
    hhmmss: {
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
    },
  },

  dateTimeRange: {
    custom: {
      year: '2-digit',
      month: 'numeric',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    },
  },
};
