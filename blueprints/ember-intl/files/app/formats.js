export default {
  /**
   * For `number`, the full list of Intl.NumberFormat parameters are supported:
   * See: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/NumberFormat
   */
  number: {
    currency: {
      style: 'currency'
    },
    percent: {
      style: 'percent'
    }
  },

  /**
   * For `date`, `time`, and `datetime` the full list of Intl.DateTimeFormat parameters are supported.
   * See: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DateTimeFormat#Parameters
   */
  date: {
    'short': {
      month: 'numeric',
      day: 'numeric',
      year: '2-digit'
    },
    'medium': {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    },
    'long': {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    },
    'full': {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    }
  },
  time: {
    'short': {
      hour: 'numeric',
      minute: 'numeric'
    },
    'medium': {
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric'
    },
    'long': {
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      timeZoneName: 'short'
    },
    'full': {
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      timeZoneName: 'short'
    }
  },
  datetime: {
    'short': {
      hour: 'numeric',
      minute: 'numeric',
      month: 'numeric',
      day: 'numeric',
      year: '2-digit'
    },
    'medium': {
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    },
    'long': {
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      timeZoneName: 'short',
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    },
    'full': {
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      timeZoneName: 'short',
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    }
  }
};
