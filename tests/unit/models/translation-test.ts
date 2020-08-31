import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import Translation from 'ember-intl/-private/store/translation';
import type { TestContext as BaseTestContext } from 'ember-test-helpers';

interface TestContext extends BaseTestContext {
  translationObject: Translation;
}

module('Unit | Model | translation', function (hooks) {
  setupTest(hooks);

  hooks.beforeEach(function (this: TestContext) {
    this.translationObject = new Translation('en-us');
  });

  test('can handle deeply nested object passed into addTranslations', function (this: TestContext, assert) {
    this.translationObject.addTranslations({ foo: { bar: { baz: 'BAZ WORKZ' } } });

    assert.ok(this.translationObject.has('foo.bar.baz'));
  });

  test('can handle flat object shape passed into addTranslations', function (this: TestContext, assert) {
    this.translationObject.addTranslations({ baz: 'BAZZZ' });

    assert.ok(this.translationObject.has('baz'));
  });
});
