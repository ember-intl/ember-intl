// BEGIN-SNIPPET docs__helpers__format-date__example-2__app__ember-intl.ts
import type { Formats } from 'ember-intl';

export const formats: Formats = {
  'format-date': {
    'user-friendly': {
      day: 'numeric',
      month: 'long',
      weekday: 'short',
    },
  },
};
// END-SNIPPET
