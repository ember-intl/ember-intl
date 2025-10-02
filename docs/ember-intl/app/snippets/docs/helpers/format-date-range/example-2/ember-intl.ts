// BEGIN-SNIPPET docs__helpers__format-date-range__example-2__app__ember-intl.ts
import type { Formats } from 'ember-intl';

export const formats: Formats = {
  'format-date-range': {
    'user-friendly': {
      day: 'numeric',
      month: 'short',
    },
  },
};
// END-SNIPPET
