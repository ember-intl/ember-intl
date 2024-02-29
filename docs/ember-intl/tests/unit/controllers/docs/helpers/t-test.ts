import { setupTest } from 'docs-app-for-ember-intl/tests/helpers';
import { module, test } from 'qunit';

module('Unit | Controller | docs/helpers/t', function (hooks) {
  setupTest(hooks);

  // TODO: Replace this with your real tests.
  test('it exists', function (assert) {
    const controller = this.owner.lookup('controller:docs/helpers/t');
    assert.ok(controller);
  });
});
