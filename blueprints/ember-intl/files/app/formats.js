export default {
  /**
   * `number` configurations should reference `Intl.NumberFormat` params
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
   * `date` & `time` configurations should reference `Intl.DateTimeFormat` params
   * See: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DateTimeFormat#Parameters
   */
  date: {
    short: {
      month: 'numeric',
      day: 'numeric',
      year: '2-digit'
    },
    medium: {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    },
    long: {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    },
    full: {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    }
  },
  time: {
    short: {
      hour: 'numeric',
      minute: 'numeric'
    },
    medium: {
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric'
    },
    long: {
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      timeZoneName: 'short'
    },
    full: {
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      timeZoneName: 'short'
    }
  }
};
