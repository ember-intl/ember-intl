import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { setupIntl, t } from 'ember-intl/test-support';

module('Integration | Test Helpers', function(hooks) {
  setupRenderingTest(hooks);

  module('setupIntl(hooks)', function(hooks) {
    setupIntl(hooks);

    test('hooks were properly executed and helpers work', async function(assert) {
      assert.strictEqual(this.intl, this.owner.lookup('service:intl'), '`this.intl` shorthand is available');

      assert.strictEqual(
        this.intl.t('some.translation'),
        't:some.translation:()',
        '`t` method serializes translation without variables'
      );
      assert.strictEqual(
        this.intl.t('some.translation', { foo: 'bar' }),
        't:some.translation:("foo":"bar")',
        '`t` method serializes translation with variables'
      );

      assert.strictEqual(
        this.intl.t('some.translation'),
        t('some.translation'),
        '`t` helper serializes translation without variables'
      );
      assert.strictEqual(
        this.intl.t('some.translation', { foo: 'bar' }),
        t('some.translation', { foo: 'bar' }),
        '`t` helper serializes translation with variables'
      );
    });
  });
});
