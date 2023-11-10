import { setupTest } from 'docs-app/tests/helpers';
import { module, test } from 'qunit';

module('Unit | Route | application', function (hooks) {
  setupTest(hooks);

  test('it exists', function (assert) {
    const route = this.owner.lookup('route:application');
    assert.ok(route);
  });
});
