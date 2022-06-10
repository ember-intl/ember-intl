import { visit } from '@ember/test-helpers';
import { setupIntl } from 'ember-intl/test-support';
import { setupApplicationTest } from 'ember-qunit';
import { module, test } from 'qunit';

module('Acceptance | smoke', function (hooks) {
  setupApplicationTest(hooks);
  setupIntl(hooks, 'en-us');

  test('{{format-number}} helper works', async function (assert) {
    await visit('/smoke');

    assert.dom('[data-test-field="Format Number"]').hasText('€1,000.00');
  });

  test('{{format-date}} helper works', async function (assert) {
    await visit('/smoke');

    assert.dom('[data-test-field="Format Date"]').hasText('1/23/2014');
  });

  test('{{format-time}} helper works', async function (assert) {
    await visit('/smoke');

    assert.dom('[data-test-field="Format Time"]').hasText('18:00:44');
  });

  test('{{format-relative}} helper works', async function (assert) {
    await visit('/smoke');

    assert.dom('[data-test-field="Format Relative"]').hasText('in 1 day');
  });

  test('Nested translations works', async function (assert) {
    await visit('/smoke');

    assert.dom('[data-test-field="Nested Translations"]').hasText('Working');
  });
});
