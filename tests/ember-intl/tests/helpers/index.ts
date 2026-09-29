import type { SetupTestOptions } from 'ember-qunit';
import {
  setupApplicationTest as upstreamSetupApplicationTest,
  setupRenderingTest as upstreamSetupRenderingTest,
  setupTest as upstreamSetupTest,
} from 'ember-qunit';
import translationsForDeDe from 'virtual:ember-intl/translations/de-de';
import translationsForEnUs from 'virtual:ember-intl/translations/en-us';

function setupApplicationTest(
  hooks: NestedHooks,
  options?: SetupTestOptions,
): void {
  upstreamSetupApplicationTest(hooks, options);

  // Additional setup for application tests can be done here.
}

function setupRenderingTest(
  hooks: NestedHooks,
  options?: SetupTestOptions,
): void {
  upstreamSetupRenderingTest(hooks, options);

  // Additional setup for rendering tests can be done here.
  hooks.beforeEach(function () {
    const intl = this.owner.lookup('service:intl');

    intl.addTranslations('de-de', translationsForDeDe);
    intl.addTranslations('en-us', translationsForEnUs);
  });
}

function setupTest(hooks: NestedHooks, options?: SetupTestOptions): void {
  upstreamSetupTest(hooks, options);

  // Additional setup for unit tests can be done here.
  hooks.beforeEach(function () {
    const intl = this.owner.lookup('service:intl');

    intl.addTranslations('de-de', translationsForDeDe);
    intl.addTranslations('en-us', translationsForEnUs);
  });
}

export { setupApplicationTest, setupRenderingTest, setupTest };

export * from './autotracking';
