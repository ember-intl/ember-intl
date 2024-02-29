import '@glint/environment-ember-loose';
import '@glint/environment-ember-template-imports';
import 'ember-source/types';
import 'ember-source/types/preview';

import type EmberPageTitleRegistry from 'ember-page-title/template-registry';
import type EmberTruthHelpersRegistry from 'ember-truth-helpers/template-registry';

import type EmberIntlRegistry from './ember-intl';

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry
    extends EmberIntlRegistry,
      EmberPageTitleRegistry,
      EmberTruthHelpersRegistry {
    // Add any registry entries from other addons here that your addon itself uses (in non-strict mode templates)
    // See https://typed-ember.gitbook.io/glint/using-glint/ember/using-addons
  }
}
