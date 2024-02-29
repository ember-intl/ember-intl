import { setupTest } from 'docs-app/tests/helpers';
import { module, test } from 'qunit';

module('Unit | Controller | docs/helpers/format-date', function (hooks) {
  setupTest(hooks);

  // TODO: Replace this with your real tests.
  test('it exists', function (assert) {
    const controller = this.owner.lookup('controller:docs/helpers/format-date');
    assert.ok(controller);
  });
});
