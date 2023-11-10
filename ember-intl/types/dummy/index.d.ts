/* eslint-disable import/no-duplicates */
import '@glint/environment-ember-loose';

import type { HelperLike } from '@glint/environment-ember-loose';
import type EmberIntlRegistry from 'ember-intl/template-registry';

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry extends EmberIntlRegistry {
    // Add any registry entries from other addons here that your addon itself uses (in non-strict mode templates)
    // See https://typed-ember.gitbook.io/glint/using-glint/ember/using-addons
    'root-url': HelperLike<{
      Args: {
        Positional: [relativeURL: string];
      };
    }>;
  }
}
