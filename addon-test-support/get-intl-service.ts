import type EngineInstance from '@ember/engine/instance';
import { getContext, TestContext } from '@ember/test-helpers';
import type IntlService from 'ember-intl/services/intl';

/**
 * Helper that provides the instance of the intl service for use during tests.
 *
 * @example
 * ```js
 * import { module, test } from 'qunit';
 * import { setupRenderingTest } from 'ember-qunit';
 * import { setupIntl, getIntlService } from 'ember-intl/test-support';
 *
 * module('My Module', function (hooks) {
 *   setupRenderingTest(hooks);
 *   setupIntl(hooks);
 *
 *   test('my test', async function (assert) {
 *     let intlService = getIntlService();
 *
 *     intlService.t('my-translation-key')
 *   });
 * });
 * ```
 *
 * @example
 * The owner can be passed to `getIntlService`
 * ```js
 *   test('my test', async function (assert) {
 *     let intlService = getIntlService(this.owner);
 *
 *     intlService.t('my-translation-key')
 *   });
 * ```
 *
 * @param {EngineInstance} [owner] a specific owner can be passed, otherwise the owner will be guessed via `getContext`
 */
export function getIntlService(owner?: unknown) {
  let _owner = owner as EngineInstance;

  if (!owner) {
    _owner = (getContext() as TestContext).owner;
  }

  return _owner.lookup('service:intl') as IntlService;
}
