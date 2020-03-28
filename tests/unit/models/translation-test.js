import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import Translation from 'ember-intl/-private/store/translation';

module('Unit | Model | translation', function (hooks) {
  setupTest(hooks);

  hooks.beforeEach(function () {
    this.translationObject = Translation.create();
  });

  test('can handle deeply nested object passed into addTranslations', function (assert) {
    this.translationObject.addTranslations({ foo: { bar: { baz: 'BAZ WORKZ' } } });

    assert.equal(this.translationObject.find('foo.bar.baz'), 'BAZ WORKZ');
  });

  test('can handle flat object shape passed into addTranslations', function (assert) {
    this.translationObject.addTranslations({ baz: 'BAZZZ' });

    assert.equal(this.translationObject.find('baz'), 'BAZZZ');
  });
});
