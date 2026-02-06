import type { Formats } from 'ember-intl';

export const formats: Formats = {
  formatTime: {
    hhmmss: {
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
    },
  },
};
