import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';
import { visit } from '@ember/test-helpers';
import { t } from 'ember-intl/test-support';

module('Acceptance: Smoke', function(hooks) {
  setupApplicationTest(hooks);

  test('format-number', async function(assert) {
    await visit('/smoke');
    assert.dom('.format-number').includesText('€1,000.00');
  });

  test('format-date', async function(assert) {
    await visit('/smoke');
    assert.dom('.format-date').includesText('1/23/2014');
  });

  test('format-time', async function(assert) {
    await visit('/smoke');
    assert.dom('.format-time').includesText('18:00:44');
  });

  test('format-relative', async function(assert) {
    await visit('/smoke');
    assert.dom('.format-relative').includesText('yesterday');
  });

  test('translation-subdirectory', async function(assert) {
    await visit('/smoke');
    assert.ok(t('smoke.subdirectory'));
    assert.dom('.translation-subdirectory').includesText(t('smoke.subdirectory'));
  });
});
