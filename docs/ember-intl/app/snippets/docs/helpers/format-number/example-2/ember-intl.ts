// BEGIN-SNIPPET docs__helpers__format-number__example-2__app__ember-intl.ts
import type { Formats } from 'ember-intl';

export const formats: Formats = {
  'format-number': {
    EUR: {
      currency: 'EUR',
      style: 'currency',
    },
  },
};
// END-SNIPPET
