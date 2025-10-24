// BEGIN-SNIPPET docs__helpers__format-relative-time__example-2__app__ember-intl.ts
import type { Formats } from 'ember-intl';

export const formats: Formats = {
  formatRelativeTime: {
    compact: {
      style: 'narrow',
    },
  },
};
// END-SNIPPET
