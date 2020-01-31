import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Model | translation', function(hooks) {
  setupTest(hooks);

  hooks.beforeEach(function() {
    this.model = this.owner.lookup('ember-intl@model:translation');
  });

  test('can handle deeply nested object passed into addTranslations', function(assert) {
    this.model.addTranslations({ foo: { bar: { baz: 'BAZ WORKZ' } } });

    assert.equal(this.model.getValue('foo.bar.baz'), 'BAZ WORKZ');
  });

  test('can handle flat object shape passed into addTranslations', function(assert) {
    this.model.addTranslations({ baz: 'BAZZZ' });

    assert.equal(this.model.getValue('baz'), 'BAZZZ');
  });
});
